import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Alert
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Admin() {
  const [match, setMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    matchDate: new Date(),
    stadium: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!match.homeTeam || !match.awayTeam || !match.stadium) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    // TODO: API 호출 구현
    console.log(match);
    setSuccess('경기 일정이 등록되었습니다.');
    setMatch({
      homeTeam: '',
      awayTeam: '',
      matchDate: new Date(),
      stadium: ''
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        경기 일정 등록
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="홈팀"
                  value={match.homeTeam}
                  onChange={(e) => setMatch({ ...match, homeTeam: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="원정팀"
                  value={match.awayTeam}
                  onChange={(e) => setMatch({ ...match, awayTeam: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="경기 일시"
                    value={match.matchDate}
                    onChange={(newValue) => setMatch({ ...match, matchDate: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="경기장"
                  value={match.stadium}
                  onChange={(e) => setMatch({ ...match, stadium: e.target.value })}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              등록하기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Admin; 