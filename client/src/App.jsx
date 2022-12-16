import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutYou from "./pages/AboutYou";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Itinerary from "./pages/Itinerary";
import Layout from "./layouts/Layout";
import TripRequest from "./pages/TripRequest";

function App() {

  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [loginID, setLoginID] = useState("");
  const [user, setUser] = useState()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/aboutyou"
              element={
                <AboutYou
                  notLoggedIn={notLoggedIn}
                  setNotLoggedIn={setNotLoggedIn}
                  loginID={loginID}
                  user={user}
                />
              }
            />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <Login
                  setNotLoggedIn={setNotLoggedIn}
                  setLoginID={setLoginID}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/triprequest/:id"
              element={<TripRequest notLoggedIn={notLoggedIn} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
