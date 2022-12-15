import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { signUpSchema } from "../components/validation/schema";

const SignUp = () => {
  const [msg, setMsg] = useState("");
  const [link, setLink] = useState("");

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
      setMsg("Account Created, please login ");
      setLink("here.");
    } catch (error) {
      setMsg("Account exists, please login ");
      setLink("here.");
    }
  };

  return (
    <>
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
            <legend>Sign Up</legend>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <br />
            <CustomInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
            />
            <br />
            <CustomInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
            />
            <br />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your Password"
            />
            <br />
            <CustomInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Enter your Password again"
            />
            <br />
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <p>
        {msg}
        <Link to="/login">{link}</Link>
      </p>
    </>
  );
};

export default SignUp;
