import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginSchema } from "../components/validation/schema";
import {
  ThemeProvider,
  createTheme,
  Grid,
  CssBaseline,
  Box,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import Typography from "./mui-components/Typography";
import AuthAPI from "../utils/AuthAPI";

const Login = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { setLoginID, setAuth } = useContext(AuthAPI);

  const handleLogin = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        actions.resetForm();
        setLoginID(data.currentUser);
        setAuth(data.authenticated);
        // setNotLoggedIn(false);
        // setUser(values.email);
        navigate("/account");
      }
      setMsg(data.msg);
    } catch (error) {
      setMsg("Network error, please try again later.");
      console.log(data);
    }
  };

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Grid container component="main" sx={{ height: '100vh' }}> */}
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
              <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box sx={{ mt: 1, width: "70%" }}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleLogin}
                >
                  {({ isSubmitting }) => (
                    <Form autoComplete="off">
                      <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          backgroundColor: "white",
                          width: "100%",
                          margin: "auto",
                        }}
                      />
                      <br />
                      <CustomInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your Password"
                        style={{
                          backgroundColor: "white",
                          width: "100%",
                          margin: "auto",
                        }}
                      />
                      <br />
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, width: "100%" }}
                      >
                        Log In
                      </Button>
                    </Form>
                  )}
                </Formik>
                <Grid container>
                  <Grid item xs>
                    Not a Member yet? Sign up <Link to="/signup">here</Link>.
                  </Grid>
                  <Grid container>
                    <p>{msg}</p>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Login;
