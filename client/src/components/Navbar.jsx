import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
        <Link to="/itinerary">Itinerary</Link>
        <Link to="/aboutyou">About You</Link>
        </div>
    );
}
 
export default Navbar;