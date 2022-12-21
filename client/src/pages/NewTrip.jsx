import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utils/AuthAPI";
import { useContext, useState } from "react";
import PendingTrips from "../components/PendingTrips";
import { useNavigate } from "react-router-dom";

const NewTrip = () => {
  const { loginID, auth } = useContext(AuthAPI);
  const [render, setRender] = useState(0)
  const navigate = useNavigate();

  if (!auth) {
    navigate("/login");
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <NewTripForm loginID={loginID} setRender={setRender} render={render} />
      <PendingTrips loginID={loginID} render={render} />
    </>
  );
};

export default NewTrip;
