import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Alert
} from '@mui/material';

function Vote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prediction) {
      setError('승/무/패를 선택해주세요.');
      return;
    }
    // TODO: API 호출 구현
    console.log({ prediction, score });
    navigate('/matches');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        경기 투표
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            맨유 vs 리버풀
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            2024-03-20 20:00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            올드 트래포드
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="subtitle1" gutterBottom>
              승/무/패 예측
            </Typography>
            <RadioGroup
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
            >
              <FormControlLabel value="home" control={<Radio />} label="홈팀 승" />
              <FormControlLabel value="draw" control={<Radio />} label="무승부" />
              <FormControlLabel value="away" control={<Radio />} label="원정팀 승" />
            </RadioGroup>

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              예상 스코어 (선택사항)
            </Typography>
            <TextField
              fullWidth
              placeholder="예: 2-1"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              투표하기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Vote; 