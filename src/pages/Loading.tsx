import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  navigate("/home");
  return (
    <>
      <img src="../assets/logo.png" alt="logo" />
      <div>Loading</div>
    </>
  );
};

export default Loading;
