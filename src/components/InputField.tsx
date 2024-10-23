import React from "react";

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder }) => {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
};

export default InputField;
