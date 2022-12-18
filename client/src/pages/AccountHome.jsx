import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import MiniNavOption from "../components/MiniNavOption";
import NewTripForm from "../components/NewTripForm";

const AccountHome = ({ notLoggedIn, setNotLoggedIn, loginID, user }) => {
  const [view, setView] = useState("aboutYou");
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
      <nav>
        <div>
          <MiniNavOption
            label="About You"
            option="aboutYou"
            view={view}
            setView={setView}
          />
          {" | "}
          <MiniNavOption
            label="Login Info"
            option="loginInfo"
            view={view}
            setView={setView}
          />
          {" | "}
          <MiniNavOption
            label="New Trip"
            option="newTrip"
            view={view}
            setView={setView}
          />
        </div>
        <Link to="/newtrip">
          <button>New Trip +</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {view === "aboutYou" ? (
        <AboutYouForm loginID={loginID} user={user} />
      ) : view === "loginInfo" ? (
        <LoginMaint loginID={loginID} />
      ) : (
        <NewTripForm loginID={loginID} />
      )}
    </div>
  );
};

export default AccountHome;
