import { useEffect } from "react";
import Navigation from "../components/Navigation";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { email } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email]);

  return (
    <div>
      Home
      {email && <p>{email}</p>}
      <Navigation />
    </div>
  );
};

export default Home;
