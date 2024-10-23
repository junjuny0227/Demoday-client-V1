import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async () => {
    try {
      if (!email) {
        setError("아이디를 입력해주세요");
        return;
      }

      const response = await axios.post(`${API_URL}/signin`, { email, password });

      if (response.status !== 200) {
        setError(`error : ${response.statusText}`);
      }

      if (response.status === 200) {
        navigate("/home");
      } else {
        setError("로그인 실패");
      }
    } catch (error) {
      console.error("error : ", error);
    }
  };

  return (
    <div>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleSignin}>로그인</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Signin;
