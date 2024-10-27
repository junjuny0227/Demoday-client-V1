import { useNavigate, useOutletContext } from "react-router-dom";

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
    <div>
      <h2>이메일 입력</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SignupEmail;
