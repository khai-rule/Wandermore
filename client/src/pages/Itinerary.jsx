import Activities from "../components/Activities";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Itinerary = () => {

  const [inDatabase, setInDatabase] = useState();
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

  return (
    <div>
      <Header
      img={""}
      />
        Itinerary
      <Activities activities={activities}/>
    </div>
  );
};

export default Itinerary;
