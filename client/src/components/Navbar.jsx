import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Navbar from '../components/mui-components/Navbar';
import Toolbar from '../components/mui-components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.black',
  ml: 3,
};

const leftLink = {
    fontSize: 16,
    color: 'common.black',
    ml: 3,
  };

function AppAppBar() {
  return (
    <div>
      <Navbar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/itinerary"
        sx={rightLink}
        >
        {'Itinerary'} 
        </Link>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Wandermore'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/login"
              sx={rightLink}
            >
              {'Login'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link>
          </Box>
        </Toolbar>
      </Navbar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;