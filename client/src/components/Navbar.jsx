import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Navbar from "../components/mui-components/Navbar";
import Toolbar from "../components/mui-components/Toolbar";
import { NavLink } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "ffffff",
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <Navbar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", borderBottom: 1 }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            to="/"
            sx={{ fontSize: 24 }}
            as={NavLink}
          >
            {"Wandermore"}
          </Link>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h5"
              underline="none"
              to="/dashboard"
              sx={rightLink}
              as={NavLink}
            >
              {"Dasboard (admin)"}
            </Link>

            <Link
              color="inherit"
              variant="h5"
              underline="none"
              to="/newtrip"
              sx={rightLink}
              as={NavLink}
            >
              {"+ New Trip"}
            </Link>

            <Link
              color="inherit"
              variant="h5"
              underline="none"
              to="/yourtrips"
              sx={rightLink}
              as={NavLink}
            >
              {"Your Trips"}
            </Link>

            <Link
              color="inherit"
              variant="h5"
              underline="none"
              to="/login"
              sx={rightLink}
              as={NavLink}
            >
              {"Login"}
            </Link>
            <Link
              variant="h5"
              underline="none"
              to="/signup"
              sx={{ ...rightLink, color: "primary.light" }}
              as={NavLink}
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
