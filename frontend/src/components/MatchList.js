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
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import VoteForm from './VoteForm';
import VoteList from './VoteList';

const MatchList = ({ onMatchCreated }) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [matchVotes, setMatchVotes] = useState({});

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
            <Card>
                <CardHeader
                    title={
                        <Typography variant="h5" component="h2">
                            경기 일정 목록
                        </Typography>
                    }
                />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>경기장</TableCell>
                                    <TableCell>경기 일시</TableCell>
                                    <TableCell>투표 마감 시간</TableCell>
                                    <TableCell>투표 현황</TableCell>
                                    <TableCell>투표</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matches.map((match) => (
                                    <TableRow key={match.id}>
                                        <TableCell>{match.stadium}</TableCell>
                                        <TableCell>
                                            {new Date(match.matchDate).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(match.voteEndTime).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {matchVotes[match.id] && (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Chip
                                                        label={`참석 ${matchVotes[match.id].attendingCount}명`}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                    <Chip
                                                        label={`불참 ${matchVotes[match.id].notAttendingCount}명`}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Box>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => setSelectedMatch(match)}
                                            >
                                                투표하기
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {selectedMatch && (
                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant="h6">
                                    {selectedMatch.stadium} - {new Date(selectedMatch.matchDate).toLocaleString()}
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
        </Box>
    );
};

export default MatchList; 