import { useEffect, useState } from 'react';

const AboutYouForm = ( {user} ) => {
    const [inDatabase, setInDatabase] = useState();
    const [msg, setMsg] = useState("");
    const [update, setUpdate] = useState({
        dateOfBirth: "",
        hobbies: [""],
        countryOfResidence : "",
        dietaryRestrictions: [""],
        accessibility: [""]
    });

    const handleChange = (e) => {
        setUpdate({...update, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
//! Create aboutYou data
        const response = await fetch("/api/aboutyou", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
            });
//! Send aboutYou ID to user
            const data = await response.json();
            const response2 = await fetch(`/api/user/${user}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ aboutYou: data._id }),
                });

            //! Get ID
            console.log("send to database", data._id);
            console.log("update", update);
        };



    //! Fetch Data to display their details that they saved
    //TODO fetch the id unique to the user
    const fetchData = async () => {
    try {
    const request = await fetch("/api/aboutyou")
    if (!request.ok) {
    throw new Error ("Network error");
    }
    const data = await request.json();
    if (data.length < 1) {
        console.log("no data");
    } else {
        setInDatabase(data[0]);
        console.log("data", inDatabase)
    }
    } catch (error) {
    console.error(error);
        };
    };
    
    useEffect(() => {fetchData()}, []);

    return (
        <div>
            <fieldset>
                <legend>About You</legend>
                <label>
                    Date of Birth: 
                    <input type="number" name="dateOfBirth" defaultValue={inDatabase?.dateOfBirth} placeholder="DDMMYYYY" onChange={handleChange}
                    />
                </label>
                <label>
                    Hobbies: 
                    <input type="text" name="hobbies" defaultValue={inDatabase?.hobbies} placeholder="Any Hobbies?" onChange={handleChange}
                    />
                </label>
                <label>
                    Country Of Residence:  
                    <input type="text" name="countryOfResidence" defaultValue={inDatabase?.countryOfResidence} placeholder="Country" onChange={handleChange}
                    />
                </label>
                <label>
                    Dietary Restrictions: 
                    <input type="text" name="dietaryRestrictions" defaultValue={inDatabase?.dietaryRestrictions} placeholder="Any Dietary Restrictions?" onChange={handleChange}
                    />
                </label>
                <label>
                    Accessibility: 
                    <input type="text" name="others" defaultValue={inDatabase?.others} placeholder="Others" onChange={handleChange}
                    />
                </label>
                <button onClick={handleUpdate}>Update Info</button>
            </fieldset>
        </div>
    );
}

 
export default AboutYouForm;