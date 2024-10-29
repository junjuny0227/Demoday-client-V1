import { useOutletContext } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";

interface OutletContext {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const SignupName: React.FC = () => {
  const { name, setName } = useOutletContext<OutletContext>();
  const [inputName, setInputName] = useState<string>(name);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setName(inputName);
  };

  return (
    <Wrapper>
      <h2>이름 입력</h2>
      <form onSubmit={handleSubmit}>
        <InputField type="text" value={inputName} onChange={handleNameChange} placeholder="이름을 입력하세요" />
        <NextButton to="/signup/email" disabled={!inputName} />
      </form>
    </Wrapper>
  );
};

export default SignupName;
