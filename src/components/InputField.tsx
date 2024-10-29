import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}
const Wrapper = styled.div`
  width: 22.75rem;
  height: 3.25rem;
  padding: 0 0 0 0.875rem;
  border-radius: 10px;
  border: 1px solid #625d5b;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  color: #625d5b;
  font-family: SUIT;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 17.5px;
  background-color: inherit;
  border: none;
  width: 100%;
  height: 100%;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <Wrapper>
      <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </Wrapper>
  );
};

export default InputField;
