import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutYou from "./pages/AboutYou";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Itinerary from "./pages/Itinerary";
import Layout from "./layouts/Layout";

function App() {

  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [user, setUser] = useState()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setNotLoggedIn={setNotLoggedIn} setUser={setUser}/>}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/aboutyou"
              element={
                <AboutYou
                  notLoggedIn={notLoggedIn}
                  setNotLoggedIn={setNotLoggedIn}
                  user={user}
                />
              }
            />
            <Route path="/itinerary" element={<Itinerary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
