import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignupController } from "../services/SignupController";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

interface SignupProps {
  phoneNumber: string;
  password: string;
  error: string;
}

const Signup: React.FC<SignupProps> = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!phoneNumber || !password) {
      setError("null");
    }
  }, [phoneNumber, password]);

  const handleSignup = async () => {
    if (!phoneNumber || !password) {
      setError("null");
      return;
    }
    try {
      const success = await SignupController.signup(phoneNumber, password);
      if (success) {
        navigate("/home");
      } else {
        setError("회원가입 실패");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Wrapper>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleSignup}>회원가입</button>
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

export default Signup;
