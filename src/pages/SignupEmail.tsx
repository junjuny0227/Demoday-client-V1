import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import useDebouncedDisable from "../hooks/useDebouncedDisable";
import { SignWrapper } from "../components/SignWrapper";
import { validateEmail } from "../utils/EmailValidationRegex";

interface OutletContext {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const SignupEmail: React.FC = () => {
  const { email, setEmail } = useOutletContext<OutletContext>();
  const [inputEmail, setInputEmail] = useState(email);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const isButtonDisabled = useDebouncedDisable(inputEmail, 500);

  useEffect(() => {
    validate(inputEmail);
  }, [inputEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
    setTouched(true);
    validate(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
    validate(inputEmail);
  };

  const validate = (value: string) => {
    if (!value) {
      setError("이메일을 입력하세요");
    } else if (!validateEmail(value.trim())) {
      setError("유효하지 않은 이메일 형식입니다");
    } else {
      setError(null);
      setEmail(value.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error) {
      setEmail(inputEmail);
    }
  };

  return (
    <Wrapper>
      <Progress text="개인정보 입력" bar={66} url="/signup/name" />
      <SignWrapper>
        <GuideMessage text="이메일을 입력해주세요!" />
        <form onSubmit={handleSubmit} action="#">
          <InputField
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputEmail}
            label="이메일"
          />
          {touched && error ? <p className="error">{error}</p> : null}
        </form>
      </SignWrapper>
      <NextButton to="/signup/password" disabled={!!error || isButtonDisabled} />
    </Wrapper>
  );
};

export default SignupEmail;
