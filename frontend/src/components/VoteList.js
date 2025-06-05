import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Alert,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

const VoteList = ({ matchId, onVoteSubmitted }) => {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchVotes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/matches/${matchId}/votes`);
            setVotes(response.data);
            setLoading(false);
        } catch (error) {
            console.error('투표 목록을 불러오는데 실패했습니다:', error);
            setError('투표 목록을 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVotes();
    }, [matchId, onVoteSubmitted]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    const attendingVotes = votes.filter(vote => vote.attending);
    const notAttendingVotes = votes.filter(vote => !vote.attending);

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6">
                        투표 현황
                    </Typography>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardHeader
                                title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" color="primary">
                                            참석
                                        </Typography>
                                        <Chip 
                                            label={`${attendingVotes.length}명`}
                                            color="primary"
                                            size="small"
                                        />
                                    </Box>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <List dense>
                                    {attendingVotes.map((vote) => (
                                        <ListItem key={vote.id}>
                                            <ListItemText primary={vote.name} />
                                        </ListItem>
                                    ))}
                                    {attendingVotes.length === 0 && (
                                        <ListItem>
                                            <ListItemText 
                                                primary="참석자가 없습니다" 
                                                primaryTypographyProps={{ 
                                                    color: 'text.secondary',
                                                    align: 'center'
                                                }}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardHeader
                                title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1" color="error">
                                            불참
                                        </Typography>
                                        <Chip 
                                            label={`${notAttendingVotes.length}명`}
                                            color="error"
                                            size="small"
                                        />
                                    </Box>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <List dense>
                                    {notAttendingVotes.map((vote) => (
                                        <ListItem key={vote.id}>
                                            <ListItemText primary={vote.name} />
                                        </ListItem>
                                    ))}
                                    {notAttendingVotes.length === 0 && (
                                        <ListItem>
                                            <ListItemText 
                                                primary="불참자가 없습니다" 
                                                primaryTypographyProps={{ 
                                                    color: 'text.secondary',
                                                    align: 'center'
                                                }}
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default VoteList; 