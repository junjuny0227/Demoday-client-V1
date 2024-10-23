import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

const SigninController = {
  signin: async (email: string, password: string) => {
    try {
      if (!email) {
        throw new Error("아이디를 입력해주세요");
      }

      const response = await axios.post(`${API_URL}/signin`, { email, password });

      if (response.status !== 200) {
        throw new Error(`error : ${response.statusText}`);
      }

      return response.status === 200;
    } catch (error) {
      throw new Error(`error : ${(error as Error).message}`);
    }
  },
};

const SigninView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async () => {
    try {
      const success = await SigninController.signin(email, password);
      if (success) {
        navigate("/home");
      } else {
        setError("로그인 실패");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <SigninView>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleSignin}>로그인</button>
      {error && <div>{error}</div>}
    </SigninView>
  );
};

export default Signin;
