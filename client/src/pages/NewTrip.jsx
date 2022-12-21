import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utils/AuthAPI";
import { useContext } from "react";

const NewTrip = () => {
  const { loginID, auth } = useContext(AuthAPI);

  return (
    <>
      <NewTripForm loginID={loginID} auth={auth} />
    </>
  );
};

export default NewTrip;
