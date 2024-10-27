import { useNavigate, useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

const SignupEmail: React.FC = () => {
  const navigate = useNavigate();
  const { email, setEmail, error } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    error: string;
  }>();

  const handleNext = () => {
    navigate("/signup/password");
  };

  return (
    <Wrapper>
      <h2>이메일 입력</h2>
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleNext}>다음</button>
    </Wrapper>
  );
};

export default SignupEmail;
