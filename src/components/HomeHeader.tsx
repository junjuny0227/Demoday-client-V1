import styled from "styled-components";
import { useState } from "react";
import UpDownIcon from "../assets/UpDown";

const HeaderWrapper = styled.div`
  width: 412px;
  height: 196px;
  background-color: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  transition: all 1s ease;
`;

const Text = styled.p`
  margin: 0;
  color: black;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
`;

const SearchBar = styled.div`
  width: 364px;
  height: 48px;
  border: 1px solid rgba(233, 232, 231, 1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-left: 24px;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 24px;
  border: 0;
  background-color: white;
  color: rgba(144, 144, 144, 1);

  &:focus {
    outline: none;
  }
`;

const TextWrapper = styled.div`
  padding-top: 33px;
  padding-left: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
`;

const UpDnBtn = styled.div<{ rotation: number }>`
  width: 24px;
  height: 24px;
  transform: rotate(${(props) => props.rotation}deg);
  flex-shrink: 0;
  cursor: pointer; /* 클릭 가능하게 하기 위해 추가 */
`;

function HomeHeader() {
  const [up, setUp] = useState(false);
  const [deg, setDeg] = useState(0);

  const UpHeader = () => {
    setUp((prevUp) => {
      const newUp = !prevUp; // 상태 반전
      setDeg(newUp ? 180 : 0); // 상태에 따라 회전 각도 설정
      return newUp; // 새로운 상태 반환
    });
  };

  return (
    <HeaderWrapper>
      <TextWrapper>
        <Text>안녕하세요</Text>
        <Text>오늘은 어디로 가볼까요?</Text>
      </TextWrapper>
      <SearchBar>
        <SearchInput type="text" placeholder="목적지를 입력해 주세요" />
      </SearchBar>
      <IconWrapper>
        <UpDnBtn rotation={deg} onClick={UpHeader}>
          <UpDownIcon />
        </UpDnBtn>
      </IconWrapper>
    </HeaderWrapper>
  );
}

export default HomeHeader;
