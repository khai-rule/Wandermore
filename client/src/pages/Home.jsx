import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home Page
      <br />
      New to Wandermore? Sign up <Link to="/signup">here</Link>. <br />
      Already a user? Login <Link to="/login">here</Link>.
    </div>
  );
};

export default Home;
