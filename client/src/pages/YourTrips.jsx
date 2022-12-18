import YourUpcomingTrips from "../components/YourUpcomingTrips";
import YourPastTrips from "../components/YourPastTrips";
import Header from "../components/Header";
import Typography from "../components/mui-components/Typography";

const YourTrips = () => {

    //TODO Display the users trip
    // upcoming and past trips
    return (
        <div>
            <YourUpcomingTrips />
            <YourPastTrips />
        </div>
    );
}
 
export default YourTrips;