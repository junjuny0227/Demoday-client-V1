import { Dispatch, SetStateAction, FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextButton from "../components/NextButton";

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
      setError("이름을 입력하세요");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error) {
      setName(inputName);
    }
  };

  return (
    <Wrapper>
      <h2>이름 입력</h2>
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
        <NextButton to="/signup/email" disabled={!!error} />
      </form>
    </Wrapper>
  );
};

export default SignupName;
