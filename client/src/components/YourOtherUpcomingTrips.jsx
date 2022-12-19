import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

function YourOtherUpcomingTrips() {

  return (
    <Grid
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
    justifyContent="center"
    sx={{ my: 8, px: 2}}
    >
  
    <Grid item xs={6} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', boxShadow: 0, borderRadius: 0 }}>

            <CardMedia
            component="img"
            sx={{ width: 400, display: { xs: 'none', sm: 'block' } }}
            image={"https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg"}
            alt={"Trip Image"}
            />

            <CardContent sx={{ flex: 1, bgcolor:'rgb(230, 230, 230)' }}>
                <Typography component="h5" variant="h5" sx={{ my: 1 }}>
                    {"Singapore"}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                    {"28 Dec 2022"}
                </Typography>
                <Typography variant="p" paragraph sx={{ my: 1 }}>
                    {"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents."}
                </Typography>
                <Link variant="body1" color="inherit" href="">
                    View Itinerary
                </Link>
            </CardContent>

        </Card>
      </CardActionArea>
    </Grid>

    <Grid item xs={6} md={6}>
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex', boxShadow: 0, borderRadius: 0 }}>

            <CardMedia
            component="img"
            sx={{ width: 400, display: { xs: 'none', sm: 'block' } }}
            image={"https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg"}
            alt={"Trip Image"}
            />

            <CardContent sx={{ flex: 1, bgcolor:'rgb(230, 230, 230)' }}>
                <Typography component="h5" variant="h5" sx={{ my: 1 }}>
                    {"Singapore"}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                    {"28 Dec 2022"}
                </Typography>
                <Typography variant="p" paragraph sx={{ my: 1 }}>
                    {"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents."}
                </Typography>
                <Link variant="body1" color="inherit" href="">
                    View Itinerary
                </Link>
            </CardContent>

      </Card>
    </CardActionArea>
  </Grid>

    </Grid>
  );
}

export default YourOtherUpcomingTrips;