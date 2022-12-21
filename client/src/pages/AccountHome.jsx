import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import AuthAPI from "../utils/AuthAPI";

const AccountHome = () => {
  const [view, setView] = useState("aboutYou");
  const navigate = useNavigate();
  const { loginID, auth, setAuth } = useContext(AuthAPI);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);
  //! Logout button for use else where.
  const handleLogout = async () => {
    const response = await fetch("/api/sessions", {
      method: "DELETE",
    });
    setAuth(false);
  };

  const handleChange = (event, value) => {
    setView(value);
    console.log(view);
  };

  return (
    <div>
      <nav>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleChange}
          aria-label="Account View"
        >
          <ToggleButton value="aboutYou" aria-label="about you">
            About You
          </ToggleButton>
          <ToggleButton value="loginInfo" aria-label="Login Info">
            Login Info
          </ToggleButton>
        </ToggleButtonGroup>
      </nav>
      {view === "aboutYou" ? (
        <AboutYouForm loginID={loginID} />
      ) : (
        <LoginMaint loginID={loginID} />
      )}
      <Button onClick={handleLogout} variant="outlined">
        Logout
      </Button>
    </div>
  );
};

export default AccountHome;
