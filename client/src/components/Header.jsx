import * as React from 'react';
import Button from '../components/mui-components/Button';
import Typography from '../components/mui-components/Typography';
import HeroLayout from './HeroLayout';

const backgroundImage =
  'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/10/Kinfolk_STajan03_web-1600x1280.jpg';

export default function ProductHero() {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2">
        Wander More, Worry Less
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Your adventure awaits
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href=""
        sx={{ minWidth: 200 }}
      >
        Explore
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </HeroLayout>
  );
}