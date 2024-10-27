import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupController from "../features/auth/SignupController";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";
import { Wrapper } from "../components/Wrapper";
import { ErrorMessage } from "../components/ErrorMessage";
interface SignupProps {
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
}

const Signup: React.FC<SignupProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!email || !password || !confirmPassword) {
      setError("null");
    } else if (!validateEmail(email)) {
      setError("invalid email");
    } else if (password !== confirmPassword) {
      setError("password mismatch");
    } else {
      setError("");
    }
  }, [email, password, confirmPassword]);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("null");
      return;
    }
    if (!validateEmail(email)) {
      setError("invalid email");
      return;
    }
    if (password !== confirmPassword) {
      setError("password mismatch");
      return;
    }
    try {
      const success = await SignupController.signup(email, password);
      if (success) {
        navigate("/home");
      } else {
        setError("signup failed");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Wrapper>
      <InputField
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

export default Signup;
