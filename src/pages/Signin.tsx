import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SigninService from "../features/auth/SignInController";
import styled from "styled-components";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

interface SigninProps {
  phoneNumber: string;
  password: string;
  error: string;
}

const Signin: React.FC<SigninProps> = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!phoneNumber || !password) {
      setError("null");
    }
  }, [phoneNumber, password]);

  const handleSignin = async () => {
    if (!phoneNumber || !password) {
      setError("null");
      return;
    }
    try {
      const success = await SigninService.signin(phoneNumber, password);
      if (success) {
        navigate("/home");
      } else {
        setError("로그인 실패");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateEmail(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Wrapper>
      <InputField type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="아이디" />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleSignin}>로그인</button>
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

export default Signin;
