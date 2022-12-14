import { Link, useNavigate } from "react-router-dom";

const Login = ({ setNotLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = new FormData(event.target);
    const loginInfo = Object.fromEntries(loginData);

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    if (response.ok) {
      console.log("logged in");
      setNotLoggedIn(false);
      navigate("/aboutyou");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label>
            Email:{" "}
            <input
              name="email"
              type="text"
              placeholder="example@domain.com"
              required={true}
            />
          </label>
          <br />
          <label>
            Password:{" "}
            <input
              name="password"
              type="password"
              placeholder="min. 6 characters"
              required={true}
            />
          </label>
          <br />
        </fieldset>
        <button>Log In</button>
        <button type="reset">Reset</button>
      </form>
      <br />
      <label>Not a Member yet?</label> <Link to="/signup">SIGN UP</Link>
    </>
  );
};

export default Login;
