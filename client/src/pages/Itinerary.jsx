import Activities from "../components/Activities";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utilities/formatDate";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {

  const [inDatabase, setInDatabase] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  //! Fetch Data
  useEffect(() => {
      const fetchData = async () => {
          try {
              const request = await fetch(`/api/trips/${id}`)
              if (!request.ok) {
                  throw new Error ("Network error");
          }
              const data = await request.json();
              setInDatabase(data);
          } catch (error) {
              console.error(error);
          };
      };
      fetchData()
  }, []);

  const activities = inDatabase?.activities
  const photo = activities?.[0]?.photo1
  const country = inDatabase?.country
  const activityPreference = inDatabase?.activityPreference
  const departureDate = formatDate(inDatabase?.departureDate)
  const returnDate = formatDate(inDatabase?.returnDate)

  const header = `${country} ${activityPreference} Trip`
  const subHeader = `${departureDate} - ${returnDate}`

  return (
    <div>
      <Header
        img={photo}
        text={header}
      />
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Your Activities</h1>
      <Activities activities={activities}/>
    </div>
  );
};

export default Itinerary;
