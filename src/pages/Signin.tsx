import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInController from "../features/auth/SignInController";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";
import { Wrapper } from "../components/Wrapper";
import { ErrorMessage } from "../components/ErrorMessage";
import { useUser } from "../context/UserContext";

const Signin: React.FC = () => {
  const { setEmail } = useUser();
  const [localEmail, setLocalEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localEmail || !password) {
      setError("null");
    }
  }, [localEmail, password]);

  const handleSignin = async () => {
    if (!localEmail || !password) {
      setError("null");
      return;
    }
    try {
      const success = await SignInController.signin(localEmail, password);
      if (success) {
        setEmail(localEmail);
        navigate("/home", { state: { email: localEmail } });
      } else {
        setError("Signin failed");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalEmail(value);
    if (!validateEmail(value)) {
      setError("invalid email");
    } else {
      setError("");
    }
  };

  return (
    <Wrapper>
      <InputField type="text" value={localEmail} onChange={handleEmailChange} placeholder="아이디" />
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
