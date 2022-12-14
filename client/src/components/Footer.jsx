import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/mui-components/Typography";

function Copyright() {
  return (
    <React.Fragment>
      <Typography variant="caption" sx={{ color: "primary.light" }}>
        {"© "}
        {new Date().getFullYear() + " "}
        Wandermore. Wander More, Worry Less.
      </Typography>
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "primary.main" }}
    >
      <Container sx={{ my: 8, ml: 4, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={2}>
            {/* <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            > */}
            <Typography variant="h6" sx={{ color: "primary.light" }}>
              Follow Us
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Facebook
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Instagram
                </Link>
              </Box>
            </Box>
            {/* <Grid item></Grid> */}
            {/* </Grid> */}
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" sx={{ color: "primary.light" }}>
              Explore
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Travel
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Itinerary
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={8} md={6}>
            <Typography variant="h6" sx={{ color: "primary.light" }}>
              Customer Service
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  About Us
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Contact
                </Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link variant="body2" color="primary.light" href="">
                  Help Centre
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
