import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress
} from '@mui/material';

const VoteForm = ({ matchId, onVoteSubmitted }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [matchInfo, setMatchInfo] = useState(null);

    useEffect(() => {
        const fetchMatchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/matches/${matchId}`);
                setMatchInfo(response.data);
            } catch (error) {
                console.error('경기 정보를 불러오는데 실패했습니다:', error);
                setError('경기 정보를 불러오는데 실패했습니다.');
            }
        };
        fetchMatchInfo();
    }, [matchId]);

    const handleVote = async (attending) => {
        if (!name.trim()) {
            setError('이름을 입력해주세요.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(`http://localhost:8080/api/matches/${matchId}/votes`, {
                name,
                attending
            });
            setName('');
            onVoteSubmitted();
        } catch (error) {
            console.error('투표 제출 실패:', error);
            setError(error.response?.data || '투표 제출에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const isVoteClosed = matchInfo && new Date(matchInfo.voteEndTime) < new Date();

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6">
                        투표하기
                    </Typography>
                }
            />
            <CardContent>
                {matchInfo && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        투표 마감 시간: {new Date(matchInfo.voteEndTime).toLocaleString()}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading || isVoteClosed}
                        fullWidth
                    />
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                    {isVoteClosed && (
                        <Alert severity="warning">
                            투표가 마감되었습니다.
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleVote(true)}
                            disabled={loading || isVoteClosed}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : '참석'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleVote(false)}
                            disabled={loading || isVoteClosed}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : '불참'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VoteForm; 