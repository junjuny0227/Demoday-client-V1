import { Routes, Route, BrowserRouter } from "react-router-dom";

import Setting from "./pages/Setting";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
