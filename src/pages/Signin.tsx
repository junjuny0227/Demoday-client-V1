import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SignInController from "../features/auth/SignInController";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/EmailValidationRegex";
import { Wrapper } from "../components/Wrapper";
import { ErrorMessage } from "../components/ErrorMessage";
import { useUser } from "../context/UserContext";

const Signin: React.FC = () => {
  const { setEmail } = useUser();
  const navigate = useNavigate();
  const [email, setEmailValue] = useState<string>("");
  const [password, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    try {
      const success: boolean = await SignInController.signin(email, password);
      if (success) {
        setEmail(email);
        navigate("/home", { state: { email } });
      } else {
        setError("Signin failed");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="아이디"
          name="email"
          onBlur={() => {}}
        />
        <InputField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          name="password"
          onBlur={() => {}}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <button type="submit">로그인</button>
      </form>
    </Wrapper>
  );
};

export default Signin;
