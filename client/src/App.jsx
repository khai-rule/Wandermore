import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutYou from "../pages/AboutYou";
import Itinerary from "../pages/Itinerary";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutyou" element={<AboutYou />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
