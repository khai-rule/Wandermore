import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutYou from "../pages/AboutYou";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function App() {
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setNotLoggedIn={setNotLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/aboutyou"
            element={
              <AboutYou
                notLoggedIn={notLoggedIn}
                setNotLoggedIn={setNotLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
