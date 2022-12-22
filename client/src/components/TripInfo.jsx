import { UserContext } from "../pages/admin-pages/CreateItineray";
import { useContext } from "react";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import formatDate from "../utilities/formatDate";

const TripInfo = () => {
    const userData = useContext(UserContext);

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

    const dateOfBirth = userData?.user?.aboutYou?.dateOfBirth
    const countryOfResidence = userData?.user?.aboutYou?.countryOfResidence
    const hobbies = userData?.user?.aboutYou?.hobbies
    const dietaryRestrictions = userData?.user?.aboutYou?.dietaryRestrictions
    const accessibility = userData?.user?.aboutYou?.accessibility

    //! Get age
    const getAge = () => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
    
        let age = today.getFullYear() - birthDate.getFullYear();
    
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age -= 1;
        }
        return age
    };

    return (
        <>
            <h1>Designing an Itinerary for {firstName} {lastName}</h1>

            <h2>User Info</h2>
            <h4>Email: {email}</h4>
            <h4>Age: {getAge()}</h4>
            <h4>From: {countryOfResidence}</h4>
            <h4>Hobbies: {hobbies}</h4>
            <h4>Dietary Restrictions: {dietaryRestrictions}</h4>
            <h4>Accessibility: {accessibility}</h4>

            <h2>Trip Info</h2>
            <h4>{country} {activityPreference} Trip</h4>
            <h5>{departureDate} - {returnDate}</h5>
            <h6>{pax} Pax, {paxInfo}</h6>
            <h4>{otherInfo}</h4>
            <button>Notify User</button>
        </>
    );
}
 
export default TripInfo;