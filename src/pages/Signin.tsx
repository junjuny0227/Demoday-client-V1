import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SigninController from "../features/auth/SignInController";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";
import { Wrapper } from "../components/Wrapper";
import { ErrorMessage } from "../components/ErrorMessage";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!email || !password) {
      setError("null");
    }
  }, [email, password]);

  const handleSignin = async () => {
    if (!email || !password) {
      setError("null");
      return;
    }
    try {
      const success = await SigninController.signin(email, password);
      if (success) {
        navigate("/home", { state: { email } }); // Pass email as navigation state
      } else {
        setError("signin failed");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setError("invalid email");
    } else {
      setError("");
    }
  };

  return (
    <Wrapper>
      <InputField
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="아이디"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleSignin}>로그인</button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

export default Signin;
