import "./App.css";
import { Routes, Route } from "react-router-dom";

import Setting from "./pages/Setting";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
