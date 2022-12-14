import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutYou from "./pages/AboutYou";
import Itinerary from "./pages/Itinerary";
import Layout from "./layouts/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutyou" element={<AboutYou />} />
            <Route path="/itinerary" element={<Itinerary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
