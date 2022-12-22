import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Navbar from "../components/mui-components/Navbar";
import Toolbar from "../components/mui-components/Toolbar";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import AuthModal from "./AuthModal";
import AuthAPI from "../utilities/AuthAPI";

const rightLink = {
  fontSize: 16,
  color: "ffffff",
  ml: 3,
};

function AppAppBar() {
  const [open, setOpen] = useState(false);
  const [modalView, setModalView] = useState("Login");
  const { auth, setAuth, loginID } = useContext(AuthAPI);

  const handleLogout = async () => {
    const response = await fetch("/api/sessions", {
      method: "DELETE",
    });
    setAuth(false);
  };

  const handleOpen = (e) => {
    setOpen(true);
    setModalView(e.target.firstChild.data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //TODO Add sign up to Modal as a changing view
  return (
    <div>
      <AuthModal
        open={open}
        handleClose={handleClose}
        modalView={modalView}
        setModalView={setModalView}
      />
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

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "inherit",
            }}
          >
            {auth !== false && loginID === "63a2d821c9a00cb6cee4d134" ? (
              <Link
                color="inherit"
                variant="h5"
                underline="none"
                to="/dashboard"
                sx={rightLink}
                as={NavLink}
              >
                {"Dashboard (admin)"}
              </Link>
            ) : (
              <></>
            )}
            {auth !== false ? (
              <>
                <Link
                  color="inherit"
                  variant="h5"
                  underline="none"
                  to="/account"
                  sx={rightLink}
                  as={NavLink}
                >
                  {"Account"}
                </Link>

                <Link
                  color="inherit"
                  variant="h5"
                  underline="none"
                  to="/newtrip"
                  sx={rightLink}
                  as={NavLink}
                >
                  {"New Trip +"}
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
                  sx={{
                    ...rightLink,
                    color: "primary.light",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  {"Log Out"}
                </Link>
              </>
            ) : (
              <></>
            )}

            {auth === false ? (
              <>
                <Link
                  color="inherit"
                  variant="h5"
                  underline="none"
                  sx={{
                    ...rightLink,
                    color: "primary.light",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  {"Login"}
                </Link>
                <Link
                  color="inherit"
                  variant="h5"
                  underline="none"
                  sx={{
                    ...rightLink,
                    color: "primary.light",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  {"Sign Up"}
                </Link>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </Navbar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
