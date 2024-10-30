import { useOutletContext, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import SignupController from "../features/auth/SignupController";
import styled from "styled-components";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { SignWrapper } from "../components/SignWrapper";

const Container = styled.div`
  width: 22.75rem;
  height: 10.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SignupButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  width: 22.75rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#e9e8e7" : "#2EA1E9")};
  color: ${({ disabled }) => (disabled ? "#625d5b" : "#FAFAFA")};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
  font-family: SUIT;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 0;
`;

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
    setError(null);
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

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isButtonDisabled = password !== confirmPassword || !password || !confirmPassword || isSubmitting;
    setIsDisabled(isButtonDisabled);
  }, [password, confirmPassword, isSubmitting]);

  return (
    <Wrapper>
      <Progress text="비밀번호 설정" bar={100} url="/signup/email" />
      <SignWrapper>
        <GuideMessage text="마지막 이에요!" second="비밀번호를 설정해주세요!" />
        <Container>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            label="비밀번호"
          />
          <InputField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 확인하세요"
            label="비밀번호 확인"
          />
        </Container>
        {error && <p className="error" aria-live="assertive">{error}</p>}
      </SignWrapper>
      <SignupButton onClick={handleSignup} disabled={isDisabled}>
        회원가입
      </SignupButton>
    </Wrapper>
  );
};

export default SignupPassword;
