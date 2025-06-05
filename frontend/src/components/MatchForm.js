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
    CircularProgress,
    Autocomplete
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

const MatchForm = ({ onMatchCreated }) => {
    const [stadium, setStadium] = useState('');
    const [stadiums, setStadiums] = useState([]);
    const [matchDate, setMatchDate] = useState(null);
    const [voteEndTime, setVoteEndTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [matchDateError, setMatchDateError] = useState('');
    const [voteEndTimeError, setVoteEndTimeError] = useState('');

    const fetchStadiums = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stadiums');
            setStadiums(response.data);
        } catch (error) {
            console.error('경기장 목록을 불러오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchStadiums();
    }, []);

    useEffect(() => {
        const now = new Date();
        if (matchDate) {
            if (matchDate < now) {
                setMatchDateError('경기 시간은 현재 시간 이후로 설정해야 합니다.');
            } else {
                setMatchDateError('');
            }
        } else {
            setMatchDateError('');
        }

        if (voteEndTime) {
            if (voteEndTime < now) {
                setVoteEndTimeError('마감시간은 현재 시간 이후로 설정해야 합니다.');
            } else if (matchDate && voteEndTime > matchDate) {
                setVoteEndTimeError('마감시간은 경기 시간보다 이전이어야 합니다.');
            } else {
                setVoteEndTimeError('');
            }
        } else {
            setVoteEndTimeError('');
        }
    }, [matchDate, voteEndTime]);

    const handleStadiumChange = (event, newValue) => {
        setStadium(newValue || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 빈 문자열 체크를 추가
        if (!stadium?.trim() || !matchDate || !voteEndTime) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        if (matchDateError || voteEndTimeError) {
            setError('시간 설정을 확인해주세요.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 새로운 경기장인 경우 먼저 등록
            if (!stadiums.some(s => s.name === stadium)) {
                await axios.post('http://localhost:8080/api/stadiums', {
                    name: stadium,
                    address: '',
                    description: ''
                });
                await fetchStadiums(); // 경기장 목록 새로고침
            }

            // 경기 일정 등록
            await axios.post('http://localhost:8080/api/matches', {
                stadium,
                matchDate: matchDate.toISOString(),
                voteEndTime: voteEndTime.toISOString()
            });
            setStadium('');
            setMatchDate(null);
            setVoteEndTime(null);
            onMatchCreated();
        } catch (error) {
            setError(error.response?.data || '경기 등록에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6">
                        새로운 경기 등록
                    </Typography>
                }
            />
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Autocomplete
                        value={stadium}
                        onChange={handleStadiumChange}
                        onInputChange={(event, newValue) => {
                            setStadium(newValue);
                        }}
                        options={stadiums.map(stadium => stadium.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="경기장"
                                required
                                disabled={loading}
                            />
                        )}
                        freeSolo
                        fullWidth
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                        <Box>
                            <DateTimePicker
                                label="경기 일시"
                                value={matchDate}
                                onChange={setMatchDate}
                                disabled={loading}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        error: !!matchDateError
                                    }
                                }}
                            />
                            {matchDateError && (
                                <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                                    {matchDateError}
                                </Typography>
                            )}
                        </Box>
                        <Box>
                            <DateTimePicker
                                label="투표 마감 시간"
                                value={voteEndTime}
                                onChange={setVoteEndTime}
                                disabled={loading}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        error: !!voteEndTimeError
                                    }
                                }}
                            />
                            {voteEndTimeError && (
                                <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                                    {voteEndTimeError}
                                </Typography>
                            )}
                        </Box>
                    </LocalizationProvider>
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !!matchDateError || !!voteEndTimeError}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : '경기 등록'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MatchForm; 