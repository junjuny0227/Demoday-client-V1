import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
}

const Wrapper = styled.div`
  width: 22.75rem;
  height: 4.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
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

const Text = styled.span`
  color: #1b1b1b;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding-left: 9.1px;
`;

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <Wrapper>
      <Text>{label}</Text>
      <Container>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Container>
    </Wrapper>
  );
};

export default InputField;
