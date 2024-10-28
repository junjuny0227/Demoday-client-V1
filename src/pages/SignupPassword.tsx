import { useOutletContext } from "react-router-dom";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import styled from "styled-components";
import GuideMessage from "../components/GuideMessage";

const Container = styled.div`
  width: 22.75rem;
  height: 10.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button<{ disabled?: boolean }>`
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

  const isDisabled =
    password !== confirmPassword || !password || !confirmPassword;

  return (
    <Wrapper>
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
      {error && <p className="error">{error}</p>}
      <Button onClick={handleSignup} disabled={isDisabled}>
        회원가입
      </Button>
    </Wrapper>
  );
};

export default SignupPassword;
