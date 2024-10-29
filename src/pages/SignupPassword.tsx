import { useOutletContext } from "react-router-dom";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import styled from "styled-components";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import { useEffect, useState } from "react";
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
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
    error,
  } = useOutletContext<{
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSignup: () => Promise<void>;
    error: string;
  }>();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // 비밀번호와 비밀번호 확인이 다르거나 비어 있는 경우 버튼 비활성화
    const isButtonDisabled =
      password !== confirmPassword || !password || !confirmPassword;
    setIsDisabled(isButtonDisabled);
  }, [password, confirmPassword]);

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
        {error && (
          <p className="error" aria-live="assertive">
            {error}
          </p>
        )}
      </SignWrapper>
      <SignupButton onClick={handleSignup} disabled={isDisabled}>
        회원가입
      </SignupButton>
    </Wrapper>
  );
};

export default SignupPassword;
