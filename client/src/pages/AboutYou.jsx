import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";

const AboutYou = ({ notLoggedIn, setNotLoggedIn }) => {
  const navigate = useNavigate();
  //* Code to push back to login page if not Logged in
  useEffect(() => {
    if (notLoggedIn) {
      navigate("/login");
    }
  }, [navigate, notLoggedIn]);

  const handleLogout = () => {
    setNotLoggedIn(true);
  };

  return (
    <div>
      <Link to="/triprequest">
        <button>New Trip +</button>
      </Link>
      <AboutYouForm />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AboutYou;
