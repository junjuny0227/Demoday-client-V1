import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";

const SignupEmail: React.FC = () => {
  const { email, setEmail, error } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    error: string;
  }>();

  return (
    <Wrapper>
      <h2>이메일 입력</h2>
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
        label="이메일"
      />
      {error && <p className="error">{error}</p>}
      <NextButton to="/signup/password" disabled={!email} />
    </Wrapper>
  );
};

export default SignupEmail;
