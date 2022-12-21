import CreateItineraryForm from "../../components/CreateItineraryForm";
import { useEffect, useState, createContext } from "react";
import { useParams } from 'react-router-dom'

export const UserContext = createContext();

const createItinerary = () => {
  const [inDatabase, setInDatabase] = useState([]);
  const [refresh, setRefresh] = useState(0)

  const { id } = useParams();

//! Fetch logged in user data
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`/api/trips/${id}`);
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
    }, [refresh]);

    return (
      <>
        <UserContext.Provider value={inDatabase}>
          <CreateItineraryForm setRefresh={setRefresh} refresh={refresh}/>
        </UserContext.Provider>
      </>
    );
}
 
export default createItinerary;