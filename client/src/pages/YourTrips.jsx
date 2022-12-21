import YourUpcomingTrips from "../components/YourUpcomingTrips";
import YourPastTrips from "../components/YourPastTrips";
import YourOtherUpcomingTrips from "../components/YourOtherUpcomingTrips";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import AuthAPI from "../utils/AuthAPI";
import { useContext } from "react";

export const UserContext = createContext();

const YourTrips = () => {
    const navigate = useNavigate();
    const [inDatabase, setInDatabase] = useState();
    const authApi = useContext(AuthAPI);

//     // Return to login page if not logged in
//   useEffect(() => {
//     if (notLoggedIn) {
//       navigate("/login");
//     }
//   }, [navigate, notLoggedIn]);

//TODO sort the data by dates

//! Fetch data
useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`/api/user/${authApi.loginID}`);
        try {
        if (!response.ok) {
            throw new Error("Network error");
        }
        const data = await response.json();
        if (data !== null) {
            setInDatabase(data);
        }
        } catch (error) {
        throw new Error("Network response was not OK");
        }
    };
    fetchData();
    }, []);

    console.log("cool", inDatabase)

    return (
        <>
            <UserContext.Provider value={inDatabase}>
                <YourUpcomingTrips />
                <YourOtherUpcomingTrips  />
                <YourPastTrips />
            </UserContext.Provider>
        </>
    );
}
 
export default YourTrips;