import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountHome from "./pages/AccountHome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Itinerary from "./pages/Itinerary";
import Layout from "./layouts/Layout";
import NewTrip from "./pages/NewTrip";
import CreateItinerary from "./pages/admin-pages/CreateItineray";
import YourTrips from "./pages/YourTrips";
import Dashboard from "./pages/admin-pages/Dashboard";
import AuthAPI from "./utils/AuthAPI";

function App() {
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [loginID, setLoginID] = useState("");
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <AuthAPI.Provider value={{ auth, setAuth, loginID, setLoginID }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route
                path="/account"
                element={
                  <AccountHome
                    notLoggedIn={notLoggedIn}
                    setNotLoggedIn={setNotLoggedIn}
                    loginID={loginID}
                    user={user}
                  />
                }
              />

              <Route
                path="/itinerary"
                element={
                  <Itinerary
                    notLoggedIn={notLoggedIn}
                    setNotLoggedIn={setNotLoggedIn}
                    loginID={loginID}
                    user={user}
                  />
                }
              />

              <Route
                path="/yourtrips"
                element={
                  <YourTrips
                    notLoggedIn={notLoggedIn}
                    setNotLoggedIn={setNotLoggedIn}
                    loginID={loginID}
                    user={user}
                  />
                }
              />

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

              <Route path="/newtrip" element={<NewTrip />} />

              <Route
                path="/createitinerary/:id"
                element={
                  <CreateItinerary
                    notLoggedIn={notLoggedIn}
                    loginID={loginID}
                  />
                }
              />

              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthAPI.Provider>
    </div>
  );
}

export default App;
