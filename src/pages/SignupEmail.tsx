import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import useDebouncedDisable from "../hooks/useDebouncedDisable";
import { SignWrapper } from "../components/SignWrapper";

const SignupEmail: React.FC = () => {
  const { email, setEmail, error } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    error: string;
  }>();

  const isButtonDisabled = useDebouncedDisable(email, 500);

  return (
    <Wrapper>
      <Progress text="개인정보 입력" bar={66} url="/signup/name" />
      <SignWrapper>
        <GuideMessage text="이메일을 입력해주세요!" />
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          label="이메일"
        />
        {error && <p className="error">{error}</p>}
      </SignWrapper>
      <NextButton to="/signup/password" disabled={isButtonDisabled} />
    </Wrapper>
  );
};

export default SignupEmail;
