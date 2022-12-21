import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginSchema } from "../components/validation/schema";
import { Grid, Box, Avatar, Button } from "@mui/material";
import Typography from "./mui-components/Typography";
import AuthAPI from "../utils/AuthAPI";

const Login = ({ handleClose, setModalView }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { setLoginID, setAuth, LoginID } = useContext(AuthAPI);

  const handleClick = (e) => {
    setModalView(e.target.firstChild.data);
  };

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
        if (data.currentUser === "63a2d821c9a00cb6cee4d134") {
          setLoginID(data.currentUser);
          setAuth(data.authenticated);
          handleClose();
          navigate("/dashboard");
        } else {
          // actions.resetForm();
          setLoginID(data.currentUser);
          setAuth(data.authenticated);
          handleClose();
          navigate("/account");
        }
      }
      setMsg(data.msg);
    } catch (error) {
      setMsg("Network error, please try again later.");
      console.log(data);
    }
  };

  return (
    <>
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
            Not a Member yet? 👉
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              onClick={handleClick}
            >
              {"Sign Up"}
            </Link>
            .
          </Grid>
          <Grid container>
            <p>{msg}</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
