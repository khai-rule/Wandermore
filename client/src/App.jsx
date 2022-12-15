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
                />
              }
            />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={<Login setNotLoggedIn={setNotLoggedIn} />}
            />
            <Route
              path="/triprequest"
              element={<TripRequest notLoggedIn={notLoggedIn} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
