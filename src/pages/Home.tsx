import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

const Home = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div>
      Home
      {email && <p>{email}</p>}
      <Navigation />
    </div>
  );
};

export default Home;
