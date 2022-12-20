import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import MiniNavOption from "../components/MiniNavOption";
import NewTripForm from "../components/NewTripForm";
import AuthAPI from "../utils/AuthAPI";

const AccountHome = () => {
  const [view, setView] = useState("aboutYou");
  const navigate = useNavigate();
  const authApi = React.useContext(AuthAPI);

  //* Code to push back to login page if not Logged in
  useEffect(() => {
    if (!authApi.auth) {
      navigate("/login");
    }
  }, [authApi.auth]);

  const handleLogout = () => {
    authApi.setAuth(false);
  };

  return (
    <div>
      <nav>
        <button onClick={handleLogout}>Logout</button>
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
          {/* {" | "}
          <MiniNavOption
            label="New Trip"
            option="newTrip"
            view={view}
            setView={setView}
          /> */}
        </div>
        {/* <Link to="/newtrip">
          <button>New Trip +</button>
        </Link> */}
      </nav>
      {
        view === "aboutYou" ? (
          <AboutYouForm loginID={authApi.loginID} />
        ) : (
          // view === "loginInfo" ? (
          <LoginMaint loginID={authApi.loginID} />
        )
        // ) : (
        //   <NewTripForm loginID={authApi.loginID} />
        // )
      }
    </div>
  );
};

export default AccountHome;
