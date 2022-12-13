import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutYou from "../pages/AboutYou";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutyou" element={<AboutYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
