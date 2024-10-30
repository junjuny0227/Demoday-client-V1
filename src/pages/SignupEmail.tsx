import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
    if (touched) {
      validate(e.target.value);
    }
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
      <h2>이메일 입력</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="이메일을 입력하세요"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputEmail}
        />
        {touched && error ? <p className="error">{error}</p> : null}
        <NextButton to="/signup/password" disabled={!!error} />
      </form>
    </Wrapper>
  );
};

export default SignupEmail;
