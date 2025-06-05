import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="홈"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="경기"
          value="/matches"
          icon={<SportsSoccerIcon />}
        />
        <BottomNavigationAction
          label="관리자"
          value="/admin"
          icon={<AdminPanelSettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav; 