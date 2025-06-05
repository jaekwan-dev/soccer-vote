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
    Grid
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
                        <Card variant="outlined">
                            <CardHeader
                                title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1">
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
                            <CardContent>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>이름</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {attendingVotes.map((vote) => (
                                                <TableRow key={vote.id}>
                                                    <TableCell>{vote.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <CardHeader
                                title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle1">
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
                            <CardContent>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>이름</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {notAttendingVotes.map((vote) => (
                                                <TableRow key={vote.id}>
                                                    <TableCell>{vote.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default VoteList; 