import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip
} from '@mui/material';

function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 데이터
  const match = {
    id: 1,
    homeTeam: '맨유',
    awayTeam: '리버풀',
    date: '2024-03-20 20:00',
    stadium: '올드 트래포드',
    status: 'upcoming',
    voteCount: {
      home: 45,
      draw: 30,
      away: 25
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        경기 상세
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {match.homeTeam} vs {match.awayTeam}
            </Typography>
            <Chip 
              label={match.status === 'upcoming' ? '예정' : '종료'} 
              color={match.status === 'upcoming' ? 'primary' : 'default'}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                경기 일시: {match.date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                경기장: {match.stadium}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              현재 투표 현황
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" align="center">
                  홈팀 승
                </Typography>
                <Typography variant="h6" align="center" color="primary">
                  {match.voteCount.home}%
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="center">
                  무승부
                </Typography>
                <Typography variant="h6" align="center" color="primary">
                  {match.voteCount.draw}%
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="center">
                  원정팀 승
                </Typography>
                <Typography variant="h6" align="center" color="primary">
                  {match.voteCount.away}%
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate(`/vote/${id}`)}
        sx={{ mb: 2 }}
      >
        투표하기
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate('/matches')}
      >
        목록으로
      </Button>
    </Box>
  );
}

export default MatchDetail; 