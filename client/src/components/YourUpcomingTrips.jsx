import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function YourUpcomingTrips() {

  return (

    <Grid
    container
    columns={{ xs: 4, sm: 8, md: 12 }}
    justifyContent="center"
    sx={{ my: 2, px: 2}}
    >
    
    <Paper
      sx={{
        boxShadow: 0,
        borderRadius: 0,
        position: 'relative',
        // backgroundColor: 'grey.800',
        width: "100%",
        height: "100%",
        color: '#fff',
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
                View Itinerary
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Grid>

  );
}

export default YourUpcomingTrips;