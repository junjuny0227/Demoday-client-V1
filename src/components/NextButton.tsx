import { ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface NextButtonProps {
  to: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  width: 22.75rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#e9e8e7" : "#2EA1E9")};
  color: ${({ disabled }) => (disabled ? "#625d5b" : "#FAFAFA")};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
  font-family: SUIT;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 0;
`;

const NextButton: FC<NextButtonProps> = ({
  to,
  children,
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate(to);
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
      {children || "다음"}
    </Button>
  );
};

export default NextButton;
