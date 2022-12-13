import { useEffect, useReducer, useState } from 'react';

const AboutYou = () => {
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

    const handleCreate = async () => {

        try {
            const response = await fetch("/api/aboutyou", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(inDatabase),
            });
            if (!response.ok) {
              throw new Error("Network response was not OK");
            }
            const data = await response.json();
            console.log("update", update)
            console.log("updated",inDatabase)
          } catch (error) {
            setMsg("something went wrong");
          }
        };

    const fetchData = async () => {
    try {
    const request = await fetch("/api/aboutyou")
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

    
    return (
        <div>
            <fieldset>
                <legend>About You</legend>
                <label>
                    Date of Birth: 
                    <input type="text" name="dateOfBirth" placeholder={"inDatabase[0]?.dateOfBirth"} onChange={handleChange}
                    />
                </label>
                <label>
                    Hobbies: 
                    <input type="text" name="hobbies" placeholder={"inDatabase[0]?.hobbies"} onChange={handleChange}
                    />
                </label>
                <label>
                    Country Of Residence:  
                    <input type="text" name="countryOfResidence" placeholder={"inDatabase[0]?.countryOfResidence"} onChange={handleChange}
                    />
                </label>
                <label>
                    Dietary Restrictions: 
                    <input type="text" name="dietaryRestrictions" placeholder={"inDatabase[0]?.dietaryRestrictions"} onChange={handleChange}
                    />
                </label>
                <label>
                    Accessibility: 
                    <input type="text" name="accessibility" placeholder={"inDatabase[0]?.accessibility"} onChange={handleChange}
                    />
                </label>
                <button onClick={handleCreate}>Submit</button>
            </fieldset>
        </div>
    );
}
 
export default AboutYou;