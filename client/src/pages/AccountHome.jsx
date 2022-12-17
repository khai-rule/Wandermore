import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";

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
          <span
            onClick={() => setView("aboutYou")}
            style={{
              color: view === "aboutYou" ? "#000000" : "#808080",
              textDecoration: view === "aboutYou" ? "underline" : "0",
              cursor: "pointer",
            }}
          >
            About You
          </span>
          {" | "}
          <span
            onClick={() => setView("loginInfo")}
            style={{
              color: view === "loginInfo" ? "#000000" : "#808080",
              textDecoration: view === "loginInfo" ? "underline" : "0",
              cursor: "pointer",
            }}
          >
            Login Info
          </span>
        </div>
        <Link to="/triprequest">
          <button>New Trip +</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {view === "aboutYou" ? (
        <AboutYouForm loginID={loginID} user={user} />
      ) : (
        <LoginMaint loginID={loginID} />
      )}
    </div>
  );
};

export default AccountHome;
