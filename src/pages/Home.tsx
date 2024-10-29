import Navigation from "../components/Navigation";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { email } = useUser();

  return (
    <div>
      Home
      {email && <p>{email}</p>}
      <Navigation />
    </div>
  );
};

export default Home;
