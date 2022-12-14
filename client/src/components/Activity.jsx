import { useState, useEffect } from "react";

const Activity = () => {
    const [inDatabase, setInDatabase] = useState();


    //! Fetch Data
    const fetchData = async () => {
    try {
    const request = await fetch("/api/activity")
    if (!request.ok) {
    throw new Error ("Network error");
    }
    const data = await request.json();
        setInDatabase(data);
        console.log("data", inDatabase)
    } catch (error) {
    console.error(error);
        };
    };
    
    useEffect(() => {fetchData()}, []);

    //! Display Activities
    const activities = () => {
        const getActivities = inDatabase?.map(item => {
            return (
                <div key={item.name}>
                    <h2>{item.name}</h2>
                    <h4>{item.date}</h4>
                    <h4>{item.location}</h4>
                    <h5>{item.time} Hour</h5>
                    <h5>{item.duration} Mins</h5>
                    <p>{item.description}</p>
                    <img src={item.photos[0]} width="500"/>
                    <img src={item.photos[1]} width="500"/>
                </div>
            );
        });
        return getActivities
    };

    return (
        <div>
            {activities()}
        </div>
    );
}
 
export default Activity;