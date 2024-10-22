import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  navigate("/home");
  return <div>Loading</div>;
};

export default Loading;
