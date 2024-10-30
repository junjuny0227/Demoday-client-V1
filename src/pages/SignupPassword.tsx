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

  const validatePasswords = (): boolean => {
    if (!password.trim() || !confirmPassword.trim()) {
      setError("비밀번호를 입력하세요");
      return false;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다");
      return false;
    }
    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다");
      return false;
    }
    return true;
  };

  const handleSignup = useCallback(
    debounce(async () => {
      if (!validatePasswords()) return;

      setIsSubmitting(true);
      try {
        const success = await SignupController.signup(name, email, password);
        if (success) {
          navigate("/signin");
        } else {
          setError("회원가입에 실패했습니다");
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
        name="password"
        onBlur={() => {}}
      />
      <InputField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 확인하세요"
        name="confirmPassword"
        onBlur={() => {}}
      />
      {error && <p className="error">{error}</p>}
      <Button onClick={handleSignup} disabled={isDisabled}>
        회원가입
      </Button>
    </Wrapper>
  );
};

export default SignupPassword;
