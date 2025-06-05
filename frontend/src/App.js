import React, { useState } from 'react';
import { Container, Box, Typography, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import MatchForm from './components/MatchForm';
import MatchList from './components/MatchList';
import StadiumManager from './components/StadiumManager';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [matchCreated, setMatchCreated] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showStadiumManager, setShowStadiumManager] = useState(false);
  const [error, setError] = useState('');

  const handleMatchCreated = () => {
    setMatchCreated(prev => prev + 1);
  };

  const handleAdminLogin = () => {
    setShowLoginDialog(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    setShowStadiumManager(false);
  };

  const handleLoginSubmit = () => {
    if (adminPassword === '1234') {
      setIsAdmin(true);
      setShowLoginDialog(false);
      setAdminPassword('');
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleBackToAdmin = () => {
    setShowStadiumManager(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            축구 경기 투표
          </Typography>
          {isAdmin ? (
            <>
              <Button color="inherit" onClick={() => setShowStadiumManager(true)}>
                경기장 관리
              </Button>
              <Button color="inherit" onClick={handleAdminLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleAdminLogin}>
              관리자 로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {isAdmin && !showStadiumManager && (
            <Box sx={{ mb: 4 }}>
              <MatchForm onMatchCreated={handleMatchCreated} />
            </Box>
          )}
          {showStadiumManager ? (
            <StadiumManager onBack={handleBackToAdmin} />
          ) : (
            <MatchList onMatchCreated={matchCreated} isAdmin={isAdmin} />
          )}
        </Box>
      </Container>

      {/* 관리자 로그인 다이얼로그 */}
      <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)}>
        <DialogTitle>관리자 로그인</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="비밀번호"
            type="password"
            fullWidth
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLoginDialog(false)}>취소</Button>
          <Button onClick={handleLoginSubmit}>로그인</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App; 