import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utils/AuthAPI";
import { useContext } from "react";

const NewTrip = () => {
  const authApi = useContext(AuthAPI);
  const loginID = authApi.loginID;
  const auth = authApi.auth;

  return (
    <>
      <NewTripForm loginID={loginID} auth={auth} />
    </>
  );
};

export default NewTrip;
