import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";

const SignupName: React.FC = () => {
  const { name, setName } = useOutletContext<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  }>();

  return (
    <Wrapper>
      <h2>이름 입력</h2>
      <InputField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <NextButton to="/signup/email" disabled={!name} />
    </Wrapper>
  );
};

export default SignupName;
