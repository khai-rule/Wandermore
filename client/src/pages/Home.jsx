import { Link } from "react-router-dom";
import Header from "../components/Header.jsx"
import Reviews from "../components/Reviews.jsx"
import TypesOfTrip from "../components/TypesOfTrip.jsx"

const Home = () => {
  return (
    <div>
    <Header />
    <Reviews />
    <TypesOfTrip />
      <br />
      New to Wandermore? Sign up <Link to="/signup">here</Link>. <br />
      Already a user? Login <Link to="/login">here</Link>.
    </div>
  );
};

export default Home;
