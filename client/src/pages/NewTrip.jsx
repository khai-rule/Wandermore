import NewTripForm from "../components/NewTripForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewTrip = ({ notLoggedIn, loginID }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (notLoggedIn) {
      navigate("/login");
    }
  }, [notLoggedIn]);

  return (
    <>
      <NewTripForm notLoggedIn={notLoggedIn} loginID={loginID} />
    </>
  );
};

export default NewTrip;
