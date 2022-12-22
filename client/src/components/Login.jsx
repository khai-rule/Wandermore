import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginSchema } from "../components/validation/schema";
import { Grid, Box, Avatar } from "@mui/material";
import Typography from "./mui-components/Typography";
import AuthAPI from "../utils/AuthAPI";
import Button from "./mui-components/Button";

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
      <Typography component="h1" variant="h5">
        Welcome Back
      </Typography>

      <Typography variant="p" sx={{ py:1 }}>
        <Grid item xs>
        Not a Member yet? 
        <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        onClick={handleClick}
        >
        {" Sign Up"}
        </Link>
        .
        </Grid>
      </Typography>

      <Box sx={{ mt: 1, width: "80%" }}>
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

                name="email"
                type="email"
                placeholder="Your Email"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  margin: "auto",
                }}
              />
              <br />
              <CustomInput

                name="password"
                type="password"
                placeholder="Your Password"
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
                variant="outlined"
                color="primary"
                sx={{ mt: 3, mb: 2, width: "100%" }}
                style={{ border: '1px solid' }}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="subtitle2">{msg}</Typography>

      </Box>
    </>
  );
};

export default Login;
