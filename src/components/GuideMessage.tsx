import styled from "styled-components";

interface GuideMessageProps {
  text: string;
  second?: string;
}

export const Wrapper = styled.div`
  width: 22.75rem;
  margin-bottom: 1.5rem;
`;

export const Text = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 25px;
  color: #1b1b1b;
`;

const GuideMessage: React.FC<GuideMessageProps> = ({ text, second }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      {second ? <Text>{second}</Text> : ""}
    </Wrapper>
  );
};

export default GuideMessage;
