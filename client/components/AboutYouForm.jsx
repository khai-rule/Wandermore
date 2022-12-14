import { useEffect, useState } from 'react';

const AboutYouForm = () => {
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

        // try {
        //     const response = await fetch("/api/aboutyou", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(inDatabase),
        //     });
        //     if (!response.ok) {
        //       throw new Error("Network response was not OK");
        //     }
        //     const data = await response.json();
        //     console.log("update", update)
        //     console.log("updated",inDatabase)
        //   } catch (error) {
        //     setMsg("something went wrong");
        //   }
        const response = await fetch("/api/aboutyou", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
            });
            const data = await response.json();
            console.log(data);
        };



    //! Fetch Data
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
                    <input type="text" name="dateOfBirth" defaultValue={inDatabase?.dateOfBirth} placeholder="DDMMYYYY" onChange={handleChange}
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
                    <input type="text" name="accessibility" defaultValue={inDatabase?.accessibility} placeholder="Accessibility" onChange={handleChange}
                    />
                </label>
                <button onClick={handleUpdate}>Update Info</button>
            </fieldset>
        </div>
    );
}

 
export default AboutYouForm;