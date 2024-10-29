import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import useDebouncedDisable from "../hooks/useDebouncedDisable"; // 훅 임포트
import { SignWrapper } from "../components/SignWrapper";

const SignupName: React.FC = () => {
  const { name, setName } = useOutletContext<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  }>();

  const isButtonDisabled = useDebouncedDisable(name, 500);

  return (
    <Wrapper>
      <Progress text="개인정보 입력" bar={33} />
      <SignWrapper>
        <GuideMessage text="이름을 입력해주세요!" />
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          label="이름"
        />
      </SignWrapper>
      <NextButton to="/signup/email" disabled={isButtonDisabled} />
    </Wrapper>
  );
};

export default SignupName;
