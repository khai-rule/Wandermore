import { useState } from 'react';

const AboutYou = () => {
    const [search, setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>About You</h1>
                <label>
                    <input type="text" name="search" onChange={e => setSearch(e.target.value)}/>
                </label>
                <input type="submit" value ="Submit"/>
            </form>
        </div>
    );
}
 
export default AboutYou;