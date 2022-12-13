import { useEffect, useState } from 'react';

const AboutYou = () => {
    const [search, setSearch] = useState("");
    const [inDatabase, setInDatabase] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search)
    }

    const fetchData = async () => {
    try {
    const request = await fetch("/api/aboutyou")
    if (!request.ok) {
    throw new Error ("Network error");
    }
    const data = await request.json();
    setInDatabase(data);
    console.log("data", data)
    } catch (error) {
    console.error(error);
        };
    };
    
    useEffect(() => {fetchData()}, []);

    const textBox = () => {
        inDatabase.map((item) => {
            return (
                <div>
                <label for="username">Name:</label>
                <input type="text" name="username" />
                </div>
            )
        })
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>About You</h1>
                <label>
                    <input type="text" name="search" placeholder="Date of Birth" onChange={e => setSearch(e.target.value)}/>
                    <input type="text" name="search" placeholder="Hobbies" onChange={e => setSearch(e.target.value)}/>
                    <input type="text" name="search" placeholder="Hobbies" onChange={e => setSearch(e.target.value)}/>
                    <input type="text" name="search" placeholder="Hobbies" onChange={e => setSearch(e.target.value)}/>
                    <input type="text" name="search" placeholder="Hobbies" onChange={e => setSearch(e.target.value)}/>
                </label>
                <input type="submit" value ="Submit"/>
            </form>
        </div>
    );
}
 
export default AboutYou;