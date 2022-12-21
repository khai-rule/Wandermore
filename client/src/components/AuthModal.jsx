import {
  Box,
  CssBaseline,
  Grid,
  Modal,
  ThemeProvider,
  Paper,
  createTheme,
} from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = ({
  open,
  handleClose,
  modalView,
  setModalView,
  handleOpen,
}) => {
  const theme = createTheme();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          margin: "auto",
          width: "80%",
        }}
      >
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            sx={{ height: "80vh", border: "solid white 1px" }}
          >
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              sx={{
                backgroundColor: "black",
                color: "white",
              }}
              f
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {modalView == "Login" ? (
                  <Login
                    handleClose={handleClose}
                    setModalView={setModalView}
                    handleOpen={handleOpen}
                  />
                ) : (
                  <SignUp setModalView={setModalView} handleOpen={handleOpen} />
                )}
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default AuthModal;
