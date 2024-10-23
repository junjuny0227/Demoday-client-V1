import "./App.css";
import { Routes, Route } from "react-router-dom";

import Setting from "./pages/Setting";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signin" element={<Signin phoneNumber="" password="" error="" />} />
        <Route path="/signup" element={<Signup phoneNumber="" password="" confirmPassword="" error="" />} />
      </Routes>
    </>
  );
}

export default App;
