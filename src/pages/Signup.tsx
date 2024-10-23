import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupController from "../features/auth/SignupController";
import InputField from "../components/InputField";
import { Wrapper } from "../styles/Wrapper";

interface SignupProps {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  error: string;
}

const Signup: React.FC<SignupProps> = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!phoneNumber || !password || !confirmPassword) {
      setError("null");
    } else if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
    }
  }, [phoneNumber, password, confirmPassword]);

  const handleSignup = async () => {
    if (!phoneNumber || !password || !confirmPassword) {
      setError("null");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
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
      <InputField
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="아이디"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <InputField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      <button onClick={handleSignup}>회원가입</button>
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

export default Signup;
