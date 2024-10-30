import { Dispatch, SetStateAction, FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import GuideMessage from "../components/GuideMessage";
import Progress from "../components/Progress";
import useDebouncedDisable from "../hooks/useDebouncedDisable";
import { SignWrapper } from "../components/SignWrapper";

interface OutletContext {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const SignupName: FC = () => {
  const { name, setName } = useOutletContext<OutletContext>();
  const [inputName, setInputName] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    if (touched) {
      validate(e.target.value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validate(inputName);
  };

  const validate = (value: string) => {
    if (!value.trim()) {
      setError("");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && inputName.trim()) {
      setName(inputName);
    }
  };

  const isButtonDisabled = useDebouncedDisable(inputName, 500);

  return (
    <Wrapper>
      <Progress text="개인정보 입력" bar={33} url="/signin" />
      <SignWrapper>
        <GuideMessage text="이름을 입력해주세요!" />
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="이름을 입력하세요"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={inputName}
          />
          {touched && error ? <p className="error">{error}</p> : null}
        </form>
      </SignWrapper>
      <NextButton to="/signup/email" disabled={!!error || isButtonDisabled || !inputName.trim()} />
    </Wrapper>
  );
};

export default SignupName;
