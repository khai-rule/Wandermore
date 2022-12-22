import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utilities/AuthAPI";
import { useContext, useState, useEffect } from "react";
import PendingTrips from "../components/PendingTrips";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Divider, Grid } from "@mui/material";

const NewTrip = () => {
  const { loginID, auth } = useContext(AuthAPI);
  const [render, setRender] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <>
      <Header
        text="New Trip +"
        img="https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/Orcas-9_sRGB.jpg"
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
        <NewTripForm loginID={loginID} setRender={setRender} render={render} />

        <PendingTrips loginID={loginID} render={render} />
        <Divider
          style={{ border: "0", width: "70%", marginTop: "50px" }}
          variant="fullWidth"
        />
      </Grid>
    </>
  );
};

export default NewTrip;
