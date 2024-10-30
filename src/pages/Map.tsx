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

  const toggleVisited = () => {
    setIsVisitedVisible((prev) => !prev); // 가시성 토글
  };

  return (
    <>
      <MapApi />
      <UiWrapper>
        <MapHeader toggleVisited={toggleVisited} />
        <div style={{ zIndex: 1 }}>
          {isVisitedVisible && <RecentVisited />}{" "}
          {/* 가시성에 따라 컴포넌트 렌더링 */}
          <Navigation />
        </div>
      </UiWrapper>
    </>
  );
};

export default Map;
