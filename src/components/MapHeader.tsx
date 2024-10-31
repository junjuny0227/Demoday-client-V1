import styled from "styled-components";
import { useState } from "react";
import UpDownIcon from "../assets/UpDown"; // 경로를 알맞게 수정하세요.

interface HeaderWrapperProps {
  isCollapsed: boolean;
}

interface MapHeaderProps {
  toggleVisited: () => void;
  onSearch: (keyword: string) => void; // 입력된 검색어를 부모로 전달하는 함수
}

const HeaderWrapper = styled.div<HeaderWrapperProps>`
  width: 100%;
  height: ${(props) => (props.isCollapsed ? "44px" : "196px")};
  background-color: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  transition: height 0.5s ease;
  overflow: hidden;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  top: 0;
  left: 0;
  height: 216px;
  width: 100%;
  height: 24px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const IconSwitch = styled.div<{ top: number; rotateDeg: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%vw;
  transition: all 0.5s ease;
  transform: rotate(${(props) => props.rotateDeg}deg);
`;

function MapHeader({ toggleVisited, onSearch }: MapHeaderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [rotateDeg, setRotateDeg] = useState(0);
  const [top, setTop] = useState(156);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>(""); // 검색어 상태 추가

  const UpHeader = () => {
    setIsVisible((prev) => !prev);
    setRotateDeg((prevDeg) => prevDeg + 180);
    setTop((prevTop) => (prevTop === 156 ? 4 : 156));
    setIsCollapsed((prev) => !prev);
    toggleVisited();
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword); // 부모로 검색어 전달
    }
  };

  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div>
        {isVisible && (
          <>
            <TextWrapper>
              <Text>안녕하세요</Text>
              <Text>오늘은 어디로 가볼까요?</Text>
            </TextWrapper>
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="목적지를 입력해 주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} // 검색어 상태 업데이트
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // Enter 키로 검색
                  }
                }}
              />
            </SearchBar>
          </>
        )}
        <IconWrapper onClick={UpHeader}>
          <IconSwitch top={top} rotateDeg={rotateDeg}>
            <UpDownIcon />
          </IconSwitch>
        </IconWrapper>
      </div>
    </HeaderWrapper>
  );
}

export default MapHeader;
