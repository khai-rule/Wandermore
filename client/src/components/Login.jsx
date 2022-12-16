import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomInput from "../components/CustomInput";
import { loginSchema } from "../components/validation/schema";

const Login = ({ setNotLoggedIn, setLoginID }) => {
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
      const data = await response.json();
      if (response.ok) {
        actions.resetForm();
        setLoginID(data.id);
        setNotLoggedIn(false);
        navigate("/aboutyou");
      }
      setMsg(data.msg);
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
      <p>{msg}</p>
      <p>
        Not a Member yet? Sign up <Link to="/signup">here</Link>.
      </p>
    </>
  );
};

export default Login;
