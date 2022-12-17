import { Link } from "react-router-dom";
import Header from "../components/Header.jsx"
import Reviews from "../components/Reviews.jsx"
import TypesOfTrip from "../components/TypesOfTrip.jsx"
import Typography from "../components/mui-components/Typography.jsx";

const Home = () => {
  return (
    <div>
    <Typography sx={{ p: 4, display: 'flex', flexWrap: 'wrap'}}
    variant="h1" align="left" component="h2" color="primary.light" bgcolor="primary.main">
    Wander More, <br></br> Worry Less
  </Typography>
    <Header />
    <Reviews />
    <TypesOfTrip />
    </div>
  );
};

export default Home;
