import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import "./styles/global.css";
import "./styles/fonts.css";

import Setting from "./pages/Setting";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import SignupName from "./pages/SignupName";
import SignupEmail from "./pages/SignupEmail";
import SignupPassword from "./pages/SignupPassword";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />}>
            <Route index element={<Navigate to="name" replace />} />
            <Route path="name" element={<SignupName />} />
            <Route path="email" element={<SignupEmail />} />
            <Route path="password" element={<SignupPassword />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
