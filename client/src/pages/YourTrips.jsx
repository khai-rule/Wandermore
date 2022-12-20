import YourUpcomingTrips from "../components/YourUpcomingTrips";
import YourPastTrips from "../components/YourPastTrips";
import YourOtherUpcomingTrips from "../components/YourOtherUpcomingTrips";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const YourTrips = ({ notLoggedIn, setNotLoggedIn, loginID, user }) => {
    const navigate = useNavigate();

//     // Return to login page if not logged in
//   useEffect(() => {
//     if (notLoggedIn) {
//       navigate("/login");
//     }
//   }, [navigate, notLoggedIn]);

  console.log("out", loginID)

    //TODO Display the users trip
    // upcoming and past trips
    return (
        <div>
            <YourUpcomingTrips loginID={loginID} />
            <YourOtherUpcomingTrips loginID={loginID} />
            <YourPastTrips loginID={loginID} />
        </div>
    );
}
 
export default YourTrips;