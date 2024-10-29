import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/check-status");
        if (!response.ok) {
          throw new Error("Server response not OK");
        }
        const data = await response.json();
        if (data.status === 200) {
          navigate("/home");
        } else {
          setTimeout(checkStatus, 1000);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/home");
      }
    };

    checkStatus();
  }, [navigate]);

  return (
    <>
      <img src="../assets/logo.png" alt="logo" />
      <div>Loading</div>
    </>
  );
};

export default Loading;
