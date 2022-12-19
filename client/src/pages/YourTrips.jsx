import YourUpcomingTrips from "../components/YourUpcomingTrips";
import YourPastTrips from "../components/YourPastTrips";
import YourOtherUpcomingTrips from "../components/YourOtherUpcomingTrips";

const YourTrips = () => {

    //TODO Display the users trip
    // upcoming and past trips
    return (
        <div>
            <YourUpcomingTrips />
            <YourOtherUpcomingTrips />
            <YourPastTrips />
        </div>
    );
}
 
export default YourTrips;