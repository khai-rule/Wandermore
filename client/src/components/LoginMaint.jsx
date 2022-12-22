import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginMaintSchema } from "../components/validation/schema";
import { Box, Button, Grid } from "@mui/material";

const LoginMaint = ({ loginID }) => {
  const [inDatabase, setInDatabase] = useState({
    email: "",
    firstName: "",
    lastName: "",
    passwordOld: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");

  const handlePasswordChange = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (values.passwordOld === values.password) {
      actions.resetForm();
      setMsg("Old Password and New Password cannot be the same");
    } else {
      try {
        const response = await fetch(`/api/user/${loginID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          actions.resetForm();
          setMsg("Your password has been changed!");
        } else {
          actions.resetForm();
          setMsg("Your old password is incorrect, please try again");
        }
      } catch (error) {
        throw new Error("Network response error not OK");
      }
    }
  };

  //! Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/fetch/${loginID}`);
      try {
        if (!response.ok) {
          throw new Error("Network error");
        }
        const data = await response.json();
        if (data !== null) {
          setInDatabase({ ...inDatabase, ...data });
        }
      } catch (error) {
        throw new Error("Network response was not OK");
      }
    };
    fetchData();
  }, [loginID]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      width="70%"
    >
      <Box sx={{ width: "50%" }}>
        <h1>Login Info</h1>
        <p style={{ width: "50%" }}>
          Hi Wanderer, these are your login details. You can change your
          password as required.
        </p>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Formik
          enableReinitialize={true}
          initialValues={inDatabase}
          validationSchema={loginMaintSchema}
          onSubmit={handlePasswordChange}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <fieldset
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "0",
                }}
              >
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={true}
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                  title="You cannot change this."
                  variant="standard"
                />
                <br />
                <CustomInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  disabled={true}
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                  title="You cannot change this."
                  variant="standard"
                />
                <br />
                <CustomInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  disabled={true}
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                  title="You cannot change this."
                  variant="standard"
                />
                <br />
                <CustomInput
                  label="Old Password"
                  name="passwordOld"
                  type="password"
                  placeholder="Enter your Old Password"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="New Password"
                  name="password"
                  type="password"
                  placeholder="Enter your New Password"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <CustomInput
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter your New Password again"
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                />
                <br />
                <br />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outlined"
                  style={{
                    width: "30%",
                    alignSelf: "flex-end",
                  }}
                >
                  Change Password
                </Button>{" "}
                <span>{msg}</span>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default LoginMaint;
