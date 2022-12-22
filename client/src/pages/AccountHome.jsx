import { Divider, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import AuthAPI from "../utilities/AuthAPI";
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
    <>
      <Header
        text="Account Home"
        img="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2022/10/Bush_Modernism_SeanFennessy_JessicaLillico_03-1194x1536.jpg"
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Divider
          style={{ border: "0", width: "70%", marginTop: "50px" }}
          variant="fullWidth"
        />
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
        <Divider
          style={{ border: "0", width: "70%", marginTop: "50px" }}
          variant="fullWidth"
        />
        {view === "aboutYou" ? (
          <AboutYouForm loginID={loginID} />
        ) : (
          <LoginMaint loginID={loginID} />
        )}
        <Divider
          style={{ border: "0", width: "70%", marginTop: "50px" }}
          variant="fullWidth"
        />
      </Grid>
    </>
  );
};

export default AccountHome;
