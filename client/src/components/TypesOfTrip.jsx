import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/mui-components/Typography';
import { common } from '@mui/material/colors';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.3,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    // border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/10/Gotland_13-2048x1366.jpg',
    title: 'Explore the uncharted',
    width: '40%',
  },
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/Kinfolk-Canal_4.jpg',
    title: 'Meet the locals',
    width: '20%',
  },
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/Orcas-1_sRGB.jpg',
    title: 'Elevate to new heights',
    width: '40%',
  },
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/Orcas-17_sRGB-2048x1638.jpg',
    title: 'Tour the seas',
    width: '38%',
  },
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/08/Ponza_17.jpg',
    title: 'Promenade along the beach',
    width: '38%',
  },
  {
    url: 'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/07/MooreHotel_RM519_0231.jpg',
    title: 'Relax in comfort',
    width: '24%',
  }

];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" align="center" component="h2">
        For All Travellers
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}