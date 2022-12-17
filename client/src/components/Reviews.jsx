import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/mui-components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function ProductValues() {
  return (
    <div>
    <Typography variant="h4" align="center" component="h2" color="primary.light" bgcolor="primary.main" padding="80px 0 0 0">
      Get Out of Your Comfort Zone
    </Typography>
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.main' }}
    >
      <Container sx={{ mt: 10, mb: 15, display: 'flex', position: 'relative' }}>
      <Box
          sx={{ pointerEvents: 'none', display: "flex" }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/08/Thomas_MacDonell_02-2000x2573.jpg"
                alt="Sam Portrait"
                sx={{ height: 455 }}
              />
              <Typography variant="h6" sx={{ my: 2, mt: 4, color:"primary.light" }}>
                Sam, Software Engineer
              </Typography>
              <Typography variant="body2" sx={{ color:"primary.light" }}>
                {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/08/Cara_Marie_Piazza_01-2000x2701.jpg"
                alt="Yuri Portrait"
                sx={{ height: 455 }}
              />
              <Typography variant="h6" sx={{ my: 2, mt: 4, color:"primary.light" }}>
                Yuri, Artist
              </Typography>
              <Typography variant="body2" sx={{ color:"primary.light" }}>
                {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/08/Gabe_Verduzco_02-2000x2667.jpg"
                alt="Logan Portrait"
                sx={{ height: 455 }}
              />
              <Typography variant="h6" sx={{ my: 2, mt: 4, color:"primary.light" }}>
                Logan, Technician
              </Typography>
              <Typography variant="body2" sx={{ color:"primary.light" }}>
                {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </div>
  );
}

export default ProductValues;