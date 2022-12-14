import { useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { signUpSchema } from "../components/validation/schema";
import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "./mui-components/Button";
import Typography from "./mui-components/Typography";

const SignUp = ({ handleOpen, setModalView }) => {
  const [msg, setMsg] = useState("");

  const handleClick = (e) => {
    setModalView(e.target.firstChild.data);
  };

  const handleSignUp = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      actions.resetForm();
      setMsg("Account created.");
    } catch (error) {
      setMsg("Account exists.");
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Are you ready to Wandermore?
      </Typography>

      <Typography variant="p" sx={{ py: 1 }}>
        <Grid item xs>
          Already signed up?{" "}
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            onClick={handleClick}
          >
            {"Login"}
          </Link>
          .
        </Grid>
      </Typography>

      <Box sx={{ mt: 1, width: "70%" }}>
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
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
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  margin: "auto",
                }}
              />
              <br />
              <CustomInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
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
              <CustomInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter your Password again"
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
                style={{ border: "1px solid" }}
              >
                Join us
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="subtitle2">{msg}</Typography>
      </Box>
    </>
  );
};

export default SignUp;
