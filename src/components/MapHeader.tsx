import styled from "styled-components";
import { useState } from "react";
import UpDownIcon from "../assets/UpDown"; // 경로를 알맞게 수정하세요.

// Props 타입 정의
interface HeaderWrapperProps {
  isCollapsed: boolean;
}
const HeaderWrapper = styled.div<HeaderWrapperProps>`
  width: 100%;
  height: ${(props) => (props.isCollapsed ? "44px" : "196px")};
  background-color: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  transition: height 0.5s ease;
  overflow: hidden; /* 자식 요소가 넘치지 않도록 */
  z-index: 0;
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

const IconWrapper = styled.div<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 195px;
  height: 216px;
  width: 100%;
  height: 24px;
  margin-top: 16px;
  transition: all 0.5s ease;
`;

const IconSwitch = styled.div<{ rotateDeg: number }>`
  position: absolute;
  transition: all 0.5s ease;
  transform: rotate(${(props) => props.rotateDeg}deg);
`;

function MapHeader() {
  const [isVisible, setIsVisible] = useState<boolean>(true); // 전체 요소의 가시성 관리
  const [rotateDeg, setRotateDeg] = useState(0);
  const [top, setTop] = useState(152);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const UpHeader = () => {
    setIsVisible((prev) => !prev); // 버튼 클릭 시 가시성 반전
    setRotateDeg((prevDeg) => (prevDeg === 0 ? 180 : 0));
    setTop((prevTop) => (prevTop === 152 ? 0 : 152));
    setIsCollapsed((prev) => !prev); // height를 토글
  };

  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      {isVisible && ( // isVisible이 true일 때만 렌더링
        <>
          <TextWrapper>
            <Text>안녕하세요</Text>
            <Text>오늘은 어디로 가볼까요?</Text>
          </TextWrapper>
          <SearchBar>
            <SearchInput type="text" placeholder="목적지를 입력해 주세요" />
          </SearchBar>
        </>
      )}
      <IconWrapper top={top} onClick={UpHeader}>
        <IconSwitch rotateDeg={rotateDeg}>
          <UpDownIcon />
        </IconSwitch>
      </IconWrapper>
    </HeaderWrapper>
  );
}

export default MapHeader;
