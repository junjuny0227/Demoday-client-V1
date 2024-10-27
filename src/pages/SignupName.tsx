import { useNavigate, useOutletContext } from "react-router-dom";

const SignupName: React.FC = () => {
  const navigate = useNavigate();
  const { name, setName } = useOutletContext<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  }>();

  const handleNext = () => {
    navigate("/signup/email");
  };

  return (
    <div>
      <h2>이름 입력</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SignupName;
