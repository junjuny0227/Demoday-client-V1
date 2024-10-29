import styled from "styled-components";

export const Button = styled.button<{ disabled?: boolean }>`
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
`;
