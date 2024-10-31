import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  padding: 20px 52px 14px 52px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e9e8e7;
  background-color: white;
  position: absolute;
  bottom: 0;
`;

const Button = styled.button`
  background: none;
`;

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Button onClick={() => navigate("/setting")}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H19"
            stroke="#A1A1A1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12H19"
            stroke="#A1A1A1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 18H19"
            stroke="#A1A1A1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <Button onClick={() => navigate("/map")}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20H4.2C4.08954 20 4 19.9105 4 19.8V9.11085C4 9.04189 4.03552 8.9778 4.094 8.94125L11.894 4.06625C11.9589 4.02572 12.0411 4.02572 12.106 4.06625L19.906 8.94125C19.9645 8.9778 20 9.04189 20 9.11085V19.8C20 19.9105 19.9105 20 19.8 20H12ZM12 20V15"
            stroke="#A1A1A1"
            strokeWidth="2"
          />
        </svg>
      </Button>
      <Button onClick={() => navigate("/home")}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
            stroke="#A1A1A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Wrapper>
  );
};

export default Navigation;
