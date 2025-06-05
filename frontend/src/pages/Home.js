import React from 'react';
import { Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Football Vote
      </Typography>
      
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            오늘의 경기
          </Typography>
          <Typography variant="body2" color="text.secondary">
            현재 진행중인 투표가 없습니다.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          onClick={() => navigate('/matches')}
          fullWidth
        >
          경기 목록 보기
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/admin')}
          fullWidth
        >
          관리자 페이지
        </Button>
      </Box>
    </Box>
  );
}

export default Home; 