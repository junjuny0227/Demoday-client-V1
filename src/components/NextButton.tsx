import { ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface NextButtonProps {
  to: string;
  children?: ReactNode;
  disabled?: boolean;
}

const NextButton: FC<NextButtonProps> = ({ to, children, disabled = false }) => {
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
