import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginMaintSchema } from "../components/validation/schema";

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
        // const res = await fetch(`/api/user/check/${loginID}`);
        // if (res.ok) {
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
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={inDatabase}
        validationSchema={loginMaintSchema}
        onSubmit={handlePasswordChange}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <fieldset>
              <legend>Login Info</legend>
              <CustomInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                disabled={true}
              />
              <br />
              <CustomInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                disabled={true}
              />
              <br />
              <CustomInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                disabled={true}
              />
              <br />
              <CustomInput
                label="Old Password"
                name="passwordOld"
                type="password"
                placeholder="Enter your Old Password"
              />
              <br />
              <CustomInput
                label="New Password"
                name="password"
                type="password"
                placeholder="Enter your New Password"
              />
              <br />
              <CustomInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter your New Password again"
              />
              <br />
              <button type="submit" disabled={isSubmitting}>
                Change Password
              </button>{" "}
              <span>{msg}</span>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginMaint;
