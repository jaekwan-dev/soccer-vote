import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert
} from '@mui/material';

const AdminLogin = ({ isLoggedIn, onLogin, onLogout }) => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPassword('');
        setError('');
    };

    const handleLogin = () => {
        if (password === '1234') {
            onLogin();
            handleClose();
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={onLogout}
                >
                    관리자 로그아웃
                </Button>
            ) : (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClickOpen}
                >
                    관리자 로그인
                </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>관리자 로그인</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="비밀번호"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleLogin}>로그인</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminLogin; 