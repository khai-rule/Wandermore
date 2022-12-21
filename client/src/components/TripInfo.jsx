import { UserContext } from "../pages/admin-pages/CreateItineray";
import { useContext } from "react";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";

const TripInfo = () => {
    const userData = useContext(UserContext);
    console.log("trip info", userData)

    const firstName = capitaliseFirstLetter(userData?.user?.firstName)
    const lastName = capitaliseFirstLetter(userData?.user?.lastName)
    const email = capitaliseFirstLetter(userData?.user?.email)

    const country = capitaliseFirstLetter(userData?.country)
    const activityPreference = capitaliseFirstLetter(userData?.activityPreference)
    const departureDate = formatDate(userData?.departureDate)
    const returnDate = formatDate(userData?.returnDate)
    const pax = userData?.pax
    const paxInfo = capitaliseFirstLetter(userData?.paxInfo)
    const otherInfo = userData?.otherInfo

    console.log("fis", firstName)

    return (
        <>
            <h1>Designing an Itinerary for {firstName} {lastName}</h1>
            <h4>{email}</h4>
            <h4>{country} {activityPreference} Trip</h4>
            <h5>{departureDate} - {returnDate}</h5>
            <h6>{pax} Pax, {paxInfo}</h6>
            <p>{otherInfo}</p>
            <button>Notify User</button>
        </>
    );
}
 
export default TripInfo;