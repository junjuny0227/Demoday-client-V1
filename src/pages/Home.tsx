import { useEffect } from "react";
import Navigation from "../components/Navigation";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { email, setEmail } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else if (!email) {
      navigate("/signin");
    }
  }, [email, setEmail, navigate]);

  return (
    <div>
      Home
      {email && <p>{email}</p>}
      <Navigation />
    </div>
  );
};

export default Home;
