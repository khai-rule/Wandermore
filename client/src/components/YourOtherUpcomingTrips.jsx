import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { useContext } from "react";
import { UserContext } from "../pages/YourTrips";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter"
import formatDate from "../utilities/formatDate"
import { NavLink } from "react-router-dom";


function YourOtherUpcomingTrips() {

  const data = useContext(UserContext);
  const trips = (data?.trips)?.slice(1)

  const photo = trips?.[0]?.activities?.[0]?.photo1 ?? "https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg"
  
  const mapTrips = () => {
    const displayTrips = trips?.map(trip => {
      const country = capitaliseFirstLetter(trip.country)
      const activityPreference = capitaliseFirstLetter(trip.activityPreference)
      const depatureDate = formatDate(trip.departureDate)
      const returnDate = formatDate(trip.returnDate)


      const link = () => {
        if (trip?.activities < 1) {
          return (
            <>
              <Typography variant="subtitle2" color="inherit">
                Your Itinerary is being prepared.
                We will notify you once it is ready.
              </Typography>
            </>
          )
        } else {
          return (
            <Link variant="subtitle1" color="inherit" to="" as={NavLink}>
              View Itinerary
            </Link>
          )
        }
      }

      return (
        <>
          <Typography variant="h4" align="center" component="h2" padding="40px 0">
          Look forward to your trips
          </Typography>
          <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
          sx={{ my: 8, px: 2}}
          >
        
          <Grid item xs={6} md={6}>
            <CardActionArea component="a">
              <Card sx={{ display: 'flex', boxShadow: 0, borderRadius: 0 }}>
    
                  <CardMedia
                  component="img"
                  sx={{ width: 400, display: { xs: 'none', sm: 'block' } }}
                  image={photo}
                  alt={"Trip Image"}
                  />
    
                  <CardContent sx={{ flex: 1, bgcolor:'rgb(230, 230, 230)' }}>
                      <Typography component="h5" variant="h5" sx={{ my: 1 }}>
                          {country}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                          {depatureDate} - {returnDate}
                      </Typography>
                      <Typography variant="p" paragraph sx={{ my: 1 }}>
                        Get ready for your {activityPreference} trip!
                      </Typography>
                          {link()}
                  </CardContent>
    
              </Card>
            </CardActionArea>
          </Grid>
    
          </Grid>
        </>
      )
    });
    return displayTrips
  }

  return (
    <>
    {mapTrips()}
      
    </>
  );
}

export default YourOtherUpcomingTrips;