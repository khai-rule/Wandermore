import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginSchema } from "../components/validation/schema";

const Login = ({ setNotLoggedIn }) => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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
      if (response.ok) {
        actions.resetForm();
        setNotLoggedIn(false);
        navigate("/aboutyou");
      }
      const data = await response.json();
      setMsg(data.msg);
      console.log(data.msg);
    } catch (error) {
      setMsg("Network error, please try again later.");
    }
  };

  return (
    <>
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
            <legend>Sign Up</legend>
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <p>{msg}</p>
      <p>
        Not a Member yet? Sign up <Link to="/signup">here</Link>.
      </p>
    </>
  );
};

export default Login;
