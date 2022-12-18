import NewTripForm from "../components/NewTripForm";

const TripRequest = ({ notLoggedIn }) => {

  return (
    <>
      <NewTripForm notLoggedIn={notLoggedIn} />
    </>
  );
};

export default TripRequest;
