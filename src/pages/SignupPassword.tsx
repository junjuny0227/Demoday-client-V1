import { useOutletContext, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import SignupController from "../features/auth/SignupController";
import { Button } from "../components/Button";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const SignupPassword: React.FC = () => {
  const { password, setPassword, confirmPassword, setConfirmPassword, error, setError, name, email } =
    useOutletContext<{
      password: string;
      setPassword: React.Dispatch<React.SetStateAction<string>>;
      confirmPassword: string;
      setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
      error: string;
      setError: React.Dispatch<React.SetStateAction<string>>;
      name: string;
      email: string;
    }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignup = useCallback(
    debounce(async () => {
      if (!password || !confirmPassword) {
        setError("null");
        return;
      }
      if (password !== confirmPassword) {
        setError("password mismatch");
        return;
      }
      setIsSubmitting(true);
      try {
        const success = await SignupController.signup(name, email, password);
        if (success) {
          navigate("/signin");
        } else {
          setError("signup failed");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }, 300),
    [password, confirmPassword, name, email, navigate, setError]
  );

  const isDisabled = password !== confirmPassword || !password || !confirmPassword || isSubmitting;

  return (
    <Wrapper>
      <h2>비밀번호 입력</h2>
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
      />
      <InputField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 확인하세요"
      />
      {error && <p className="error">{error}</p>}
      <Button onClick={handleSignup} disabled={isDisabled}>
        회원가입
      </Button>
    </Wrapper>
  );
};

export default SignupPassword;
