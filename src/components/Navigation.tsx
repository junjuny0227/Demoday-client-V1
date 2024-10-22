import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/setting")}>Setting</button>
      <button onClick={() => navigate("/map")}>Map</button>
    </div>
  );
};

export default Navigation;
