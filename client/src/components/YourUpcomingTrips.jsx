import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function YourUpcomingTrips() {

  return (
    <Paper
      sx={{
        position: 'relative',
        // backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg" alt="Upcoming Trip" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 8, md: 16, lg: 24 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h3" variant="h3" color="inherit" gutterBottom>
            Iceland
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
            Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.
            </Typography>
            <Link variant="subtitle1" color="inherit" href="">
                See Itinerary
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default YourUpcomingTrips;