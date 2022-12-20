import React, { useState } from "react";
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
} from "@mui/material";
import Typography from "./mui-components/Typography";
import AuthAPI from "../utils/AuthAPI";

const Login = ({ setNotLoggedIn, setLoginID, setUser }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const authApi = React.useContext(AuthAPI);

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
        setNotLoggedIn(false);
        setUser(values.email);
        authApi.setAuth(true);
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
        <Grid container component="main" sx={{ height: "80vh" }}>
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
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
                      <legend>Log in</legend>
                      <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                      <br />
                      <CustomInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your Password"
                      />
                      <br />
                      <button disabled={isSubmitting} type="submit">
                        Log In
                      </button>
                    </Form>
                  )}
                </Formik>
                {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <p>{msg}</p>
        <p>
          Not a Member yet? Sign up <Link to="/signup">here</Link>.
        </p>
      </ThemeProvider>
    </>
  );
};

export default Login;
