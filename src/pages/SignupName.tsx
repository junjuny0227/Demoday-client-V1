import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import GuideMessage from "../components/GuideMessage";

const SignupName: React.FC = () => {
  const { name, setName } = useOutletContext<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  }>();

  return (
    <Wrapper>
      <GuideMessage text="이름을 입력해주세요!" />
      <InputField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
        label="이름"
      />
      <NextButton to="/signup/email" disabled={!name} />
    </Wrapper>
  );
};

export default SignupName;
