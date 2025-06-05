import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Stack,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VoteForm from './VoteForm';
import VoteList from './VoteList';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const MatchList = ({ onMatchCreated, isAdmin }) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [matchVotes, setMatchVotes] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [matchToDelete, setMatchToDelete] = useState(null);

    const fetchMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/matches');
            setMatches(response.data);
            setLoading(false);
        } catch (error) {
            console.error('경기 목록을 불러오는데 실패했습니다:', error);
            setError('경기 목록을 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    const fetchVotesForMatch = async (matchId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/matches/${matchId}/votes`);
            const votes = response.data;
            const attendingCount = votes.filter(vote => vote.attending).length;
            const notAttendingCount = votes.filter(vote => !vote.attending).length;
            setMatchVotes(prev => ({
                ...prev,
                [matchId]: { attendingCount, notAttendingCount }
            }));
        } catch (error) {
            console.error('투표 현황을 불러오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        if (onMatchCreated) {
            fetchMatches();
        }
    }, [onMatchCreated]);

    useEffect(() => {
        matches.forEach(match => {
            fetchVotesForMatch(match.id);
        });
    }, [matches]);

    const handleVoteSubmitted = () => {
        setVoteSubmitted(prev => !prev);
        if (selectedMatch) {
            fetchVotesForMatch(selectedMatch.id);
        }
    };

    const handleCardClick = (match) => {
        setSelectedMatch(selectedMatch?.id === match.id ? null : match);
    };

    const handleDeleteClick = (event, match) => {
        event.stopPropagation();
        setMatchToDelete(match);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/matches/${matchToDelete.id}`);
            setDeleteDialogOpen(false);
            setMatchToDelete(null);
            fetchMatches();
        } catch (error) {
            console.error('경기 삭제에 실패했습니다:', error);
            setError('경기 삭제에 실패했습니다.');
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setMatchToDelete(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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

    if (matches.length === 0) {
        return (
            <Alert severity="info" sx={{ mb: 2 }}>
                등록된 경기가 없습니다.
            </Alert>
        );
    }

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Card sx={{ mb: 4 }}>
                <CardHeader
                    title={
                        <Typography variant="h5" component="h2">
                            경기 일정 목록
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {matches.map((match) => (
                            <Grid item xs={12} key={match.id}>
                                <Card 
                                    variant="outlined" 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        ...(selectedMatch?.id === match.id && {
                                            borderColor: 'primary.main',
                                            borderWidth: 2
                                        })
                                    }}
                                    onClick={() => handleCardClick(match)}
                                >
                                    <CardContent sx={{ p: 2 }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            justifyContent: 'space-between', 
                                            gap: 1 
                                        }}>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="h6" component="div" noWrap>
                                                    {format(new Date(match.matchDate), 'M/d (E) HH:mm', { locale: ko })}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" display="block" noWrap>
                                                    {match.stadium} · 투표마감: {format(new Date(match.voteEndTime), 'M/d HH:mm', { locale: ko })}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                gap: 0.5,
                                                flexShrink: 0
                                            }}>
                                                {matchVotes[match.id] && (
                                                    <>
                                                        <Chip
                                                            label={`참석 ${matchVotes[match.id].attendingCount}`}
                                                            color="primary"
                                                            size="small"
                                                            sx={{ 
                                                                height: 24,
                                                                '& .MuiChip-label': { px: 1 }
                                                            }}
                                                        />
                                                        <Chip
                                                            label={`불참 ${matchVotes[match.id].notAttendingCount}`}
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ 
                                                                height: 24,
                                                                '& .MuiChip-label': { px: 1 }
                                                            }}
                                                        />
                                                    </>
                                                )}
                                                {isAdmin && (
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={(e) => handleDeleteClick(e, match)}
                                                        sx={{ 
                                                            flexShrink: 0,
                                                            ml: 0.5
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            {selectedMatch && (
                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant="h6">
                                    {selectedMatch.stadium} - {format(new Date(selectedMatch.matchDate), 'PPP p', { locale: ko })}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <VoteForm 
                                    matchId={selectedMatch.id} 
                                    onVoteSubmitted={handleVoteSubmitted}
                                />
                                <VoteList 
                                    matchId={selectedMatch.id} 
                                    onVoteSubmitted={voteSubmitted}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            )}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>경기 삭제</DialogTitle>
                <DialogContent>
                    <Typography>
                        정말로 이 경기를 삭제하시겠습니까?
                        <br />
                        삭제된 경기는 복구할 수 없으며, 관련된 모든 투표도 함께 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>취소</Button>
                    <Button onClick={handleDeleteConfirm} color="error">삭제</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MatchList; 