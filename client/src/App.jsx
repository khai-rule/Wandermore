import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountHome from "./pages/AccountHome";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Itinerary from "./pages/Itinerary";
import Layout from "./layouts/Layout";
import NewTrip from "./pages/NewTrip";
import CreateItinerary from './pages/admin-pages/CreateItineray';

function App() {
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [loginID, setLoginID] = useState("");
  const [user, setUser] = useState();

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route
              path="/"
              element={
                <Home />
              }
            />

            <Route
              path="/account"
              element={
                <AccountHome
                  notLoggedIn={notLoggedIn}
                  setNotLoggedIn={setNotLoggedIn}
                  loginID={loginID}
                  user={user} />
              }
            />

            <Route
              path="/itinerary"
              element={
                <Itinerary />
              }
            />

            <Route
              path="/signup"
              element={
                <SignUp />
              }
            />

            <Route
              path="/login"
              element={
                <Login
                  setNotLoggedIn={setNotLoggedIn}
                  setLoginID={setLoginID}
                  setUser={setUser} />
              }
            />

            <Route
              path="/newtrip"
              element={<NewTrip notLoggedIn={notLoggedIn} loginID={loginID} />}
            />

            <Route
              path="/createitinerary"
              element={
              <CreateItinerary notLoggedIn={notLoggedIn} loginID={loginID} />
              }
            />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
