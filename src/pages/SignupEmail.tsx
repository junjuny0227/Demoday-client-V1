import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";
import { validateEmail } from "../utils/EmailValidationRegex";

const SignupEmail: React.FC = () => {
  const { email, setEmail } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
  }>();
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setError("invalid email");
    } else {
      setError("");
    }
  };

  return (
    <Wrapper>
      <h2>이메일 입력</h2>
      <InputField type="email" value={email} onChange={handleEmailChange} placeholder="이메일을 입력하세요" />
      {error && <p className="error">{error}</p>}
      <NextButton to="/signup/password" disabled={!email || !!error} />
    </Wrapper>
  );
};

export default SignupEmail;
