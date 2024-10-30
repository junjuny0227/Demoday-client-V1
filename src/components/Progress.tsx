import styled from "styled-components";
import BackIcon from "../assets/BackIcon";
import { useNavigate } from "react-router-dom";

interface ProgressProps {
  text: string;
  bar: number;
  url: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const Text = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 22.5px;
  color: #1b1b1b;
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
`;

const Bar = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: #2ea1e9;
`;

const Progress: React.FC<ProgressProps> = ({ text, bar, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <Wrapper>
      <BackIcon onClick={handleClick} />
      {text && <Text>{text}</Text>}
      <BarWrapper>
        <Bar width={bar} />
      </BarWrapper>
    </Wrapper>
  );
};

export default Progress;
