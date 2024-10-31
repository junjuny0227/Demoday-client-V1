import styled from "styled-components";
import Navigation from "../components/Navigation";
import MapApi from "../components/MapApi";
import MapHeader from "../components/MapHeader";
import RecentVisited from "../components/RecentVisited";
import { useState } from "react";

const UiWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  z-index: 1;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const Map = () => {
  const [isVisitedVisible, setIsVisitedVisible] = useState(true); // 최근 방문지 가시성 관리
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태

  const toggleVisited = () => {
    setIsVisitedVisible((prev) => !prev); // 가시성 토글
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword); // 검색어 업데이트
    console.log(searchKeyword);
  };

  return (
    <>
      <MapApi /> {/* MapApi 위에 위치 */}
      <UiWrapper>
        <MapHeader toggleVisited={toggleVisited} onSearch={handleSearch} />
        <div style={{ zIndex: 1 }}>
          {isVisitedVisible && <RecentVisited />}
          <Navigation />
        </div>
      </UiWrapper>
    </>
  );
};

export default Map;
