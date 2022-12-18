import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Navbar from "../components/mui-components/Navbar";
import Toolbar from "../components/mui-components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "ffffff",
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <Navbar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", borderBottom: 1}}>
        
        <Link
        variant="h6"
        underline="none"
        color="inherit"
        href="/"
        sx={{ fontSize: 24 }}
      >
        {"Wandermore"}
      </Link>
 

          <Box sx={{ flex: 1 }} />

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end"}}>


          <Link
          color="inherit"
          variant="h5"
          underline="none"
          href="/createitinerary"
          sx={rightLink}
          >
            {"Create Itinerary (admin)"}
          </Link>  

          <Link
          color="inherit"
          variant="h5"
          underline="none"
          href="/newtrip"
          sx={rightLink}
          >
            {"+ New Trip"}
          </Link>  

          <Link
            color="inherit"
            variant="h5"
            underline="none"
            href="/yourtrips"
            sx={rightLink}
          >
            {"Your Trips"}
          </Link>  

            <Link
              color="inherit"
              variant="h5"
              underline="none"
              href="/login"
              sx={rightLink}
            >
              {"Login"}
            </Link>
            <Link
              variant="h5"
              underline="none"
              href="/signup"
              sx={{ ...rightLink, color: "primary.light" }}
            >
              {"Sign Up"}
            </Link>
          </Box>
        </Toolbar>
      </Navbar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
