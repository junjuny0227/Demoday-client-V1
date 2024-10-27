import { useOutletContext } from "react-router-dom";

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
    <div>
      <h2>비밀번호 입력</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 확인하세요"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleNext}>가입하기</button>
    </div>
  );
};

export default SignupPassword;
