import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { UserContext } from "../pages/YourTrips";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";
import Header from "./Header";


function YourUpcomingTrips() {
  const data = useContext(UserContext);

  const country = capitaliseFirstLetter(data?.trips?.[0]?.country);
  const activityPreference = capitaliseFirstLetter(
    data?.trips?.[0]?.activityPreference
  );
  const depatureDate = formatDate(data?.trips?.[0]?.departureDate);
  const returnDate = formatDate(data?.trips?.[0]?.returnDate);
  const photo =
    data?.trips?.[0]?.activities?.[0]?.photo1 ??
    "https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg";

  //TODO change link
  //TODO if got trips, no activities = pending
  console.log
  
  const link = () => {
    if (data?.trips?.[0]?.activities < 1) {
      return (
        <>
        <Typography variant="subtitle2" color="inherit">
          Your Itinerary is being prepared. <br />
          We will notify you once it is ready.
        </Typography>
        </>
      )
    } else {
      return (
        <Link variant="subtitle1" color="inherit" href="">
          View Itinerary
        </Link>
      )
    }
  }
    

  const display = () => {
    if (data?.trips < 1) {
      return (
        <>
          <Header
            img={"https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg"}
            text="You have no trips yet"
            linkText={"Request a trip now"}
            link={"/newtrip"}
            />
        </>
      )
    } else {

      return (
        <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        sx={{ my: 2, px: 2 }}
      >
        <Paper
          sx={{
            boxShadow: 0,
            borderRadius: 0,
            position: "relative",
            // backgroundColor: 'grey.800',
            width: "100%",
            height: "100%",
            color: "#fff",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${photo})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: "none" }} src={photo} alt="Upcoming Trip" />}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 8, md: 16, lg: 24 },
                  pr: { md: 0 },
                }}
              >
                <Typography variant="h6" color="inherit" paragraph>
                  Your {activityPreference} trip is coming up!
                </Typography>
                <Typography
                  component="h3"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {country}
                </Typography>
                <Typography variant="h6" color="inherit" paragraph>
                  {depatureDate} - <br /> {returnDate}
                </Typography>

                {link()}

              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      )
    }

  }


  return (
    <>
      {display()}
    </>
  );
}

export default YourUpcomingTrips;
