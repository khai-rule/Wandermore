import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AboutYouForm from "../components/AboutYouForm";
import LoginMaint from "../components/LoginMaint";
import MiniNavOption from "../components/MiniNavOption";
import AuthAPI from "../utils/AuthAPI";

const AccountHome = () => {
  const [view, setView] = useState("aboutYou");
  const navigate = useNavigate();
  const { loginID, auth, setAuth } = useContext(AuthAPI);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);
  //! Logout button for use else where.
  const handleLogout = async () => {
    const response = await fetch("/api/sessions", {
      method: "DELETE",
    });
    setAuth(false);
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
        </div>
      </nav>
      {view === "aboutYou" ? (
        <AboutYouForm loginID={loginID} />
      ) : (
        <LoginMaint loginID={loginID} />
      )}
    </div>
  );
};

export default AccountHome;
