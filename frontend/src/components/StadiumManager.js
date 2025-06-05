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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StadiumManager = ({ onBack }) => {
    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newStadium, setNewStadium] = useState({ name: '', address: '', description: '' });

    const fetchStadiums = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/stadiums');
            setStadiums(response.data);
            setLoading(false);
        } catch (error) {
            setError('경기장 목록을 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStadiums();
    }, []);

    const handleAddStadium = async () => {
        if (!newStadium.name.trim()) {
            setError('경기장 이름을 입력해주세요.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/stadiums', newStadium);
            setNewStadium({ name: '', address: '', description: '' });
            setOpenDialog(false);
            fetchStadiums();
        } catch (error) {
            setError('경기장 등록에 실패했습니다.');
        }
    };

    const handleDeleteStadium = async (id) => {
        if (!window.confirm('정말로 이 경기장을 삭제하시겠습니까?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/stadiums/${id}`);
            fetchStadiums();
        } catch (error) {
            setError('경기장 삭제에 실패했습니다.');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={onBack} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">경기장 관리</Typography>
            </Box>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                        >
                            경기장 추가
                        </Button>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>경기장 이름</TableCell>
                                    <TableCell>주소</TableCell>
                                    <TableCell>설명</TableCell>
                                    <TableCell align="right">관리</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stadiums.map((stadium) => (
                                    <TableRow key={stadium.id}>
                                        <TableCell>{stadium.name}</TableCell>
                                        <TableCell>{stadium.address}</TableCell>
                                        <TableCell>{stadium.description}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                color="error"
                                                onClick={() => handleDeleteStadium(stadium.id)}
                                            >
                                                삭제
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>새로운 경기장 등록</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="경기장 이름"
                            value={newStadium.name}
                            onChange={(e) => setNewStadium({ ...newStadium, name: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="주소"
                            value={newStadium.address}
                            onChange={(e) => setNewStadium({ ...newStadium, address: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="설명"
                            value={newStadium.description}
                            onChange={(e) => setNewStadium({ ...newStadium, description: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>취소</Button>
                    <Button onClick={handleAddStadium} variant="contained">
                        등록
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StadiumManager; 