import { useOutletContext } from "react-router-dom";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";

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

  const handleNext = () => {
    handleSignup();
  };

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
      <button onClick={handleNext}>가입하기</button>
    </Wrapper>
  );
};

export default SignupPassword;
