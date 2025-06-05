import React from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Grid,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MatchList() {
  const navigate = useNavigate();

  // 임시 데이터
  const matches = [
    {
      id: 1,
      homeTeam: '맨유',
      awayTeam: '리버풀',
      date: '2024-03-20 20:00',
      stadium: '올드 트래포드',
      status: 'upcoming'
    },
    {
      id: 2,
      homeTeam: '아스널',
      awayTeam: '첼시',
      date: '2024-03-21 20:00',
      stadium: '에미레이트 스타디움',
      status: 'upcoming'
    }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        경기 일정
      </Typography>

      <Grid container spacing={2}>
        {matches.map((match) => (
          <Grid item xs={12} key={match.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">
                    {match.homeTeam} vs {match.awayTeam}
                  </Typography>
                  <Chip 
                    label={match.status === 'upcoming' ? '예정' : '종료'} 
                    color={match.status === 'upcoming' ? 'primary' : 'default'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {match.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {match.stadium}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/matches/${match.id}`)}
                >
                  상세보기
                </Button>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => navigate(`/vote/${match.id}`)}
                >
                  투표하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MatchList; 