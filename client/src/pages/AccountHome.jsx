import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import AuthAPI from "../utils/AuthAPI";
import Header from "../components/Header";

const AccountHome = () => {
  const [view, setView] = useState("aboutYou");
  const navigate = useNavigate();
  const { loginID, auth } = useContext(AuthAPI);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  const handleChange = (event, value) => {
    setView(value);
  };

  return (
    <Grid sx={{ height: "100%" }}>
      <Header text="Account Home" />
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
    </Grid>
  );
};

export default AccountHome;
