import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utils/AuthAPI";
import { useContext, useState, useEffect } from "react";
import PendingTrips from "../components/PendingTrips";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
      <Header text="New Trip +" />
      <NewTripForm loginID={loginID} setRender={setRender} render={render} />
      <PendingTrips loginID={loginID} render={render} />
    </>
  );
};

export default NewTrip;
