import styled from "styled-components";
import RecentPlaceCard from "./RecentPlaceCard";

const VisitedBox = styled.div`
  width: 100vw;
  height: 217px;
  background-color: white;
  position: relative;
  z-index: -1;
`;

const Text = styled.p`
  padding: 24px 0 0 24px;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 56px;
`;

const InformationWrapper = styled.div`
  width: 100vw;
  height: 161px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  box-shadow: inset 0px -10px 6px rgba(0, 0, 0, 0.1);
`;

function RecentVisited() {
  return (
    <VisitedBox>
      <TextWrapper>
        <Text>최근 방문지</Text>
      </TextWrapper>
      <InformationWrapper>
        <RecentPlaceCard
          Name="유유샤브 광주 첨단점"
          SubName="샤브샤브"
          Address="광주 광산구 첨단중앙로152번길 81-15"
          ImgUrl="https://ifh.cc/g/qA9qoM.jpg"
          linkUrl="https://search.naver.com/search.naver?sm=tab_sug.top&where=nexearch&ssc=tab.nx.all&query=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B4%91%EC%A3%BC%EC%B2%A8%EB%8B%A8%EC%A0%90&oquery=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B5%B0%EC%9E%90%EC%97%AD%EC%A0%90&tqi=iya2dwqo1LwssfM2Q%2BGsssssthl-495517&acq=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B4%91%EC%A3%BC&acr=1&qdt=0"
        />
        <RecentPlaceCard
          Name="유유샤브 광주 첨단점"
          SubName="샤브샤브"
          Address="광주 광산구 첨단중앙로152번길 81-15"
          ImgUrl="https://ifh.cc/g/qA9qoM.jpg"
          linkUrl="https://search.naver.com/search.naver?sm=tab_sug.top&where=nexearch&ssc=tab.nx.all&query=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B4%91%EC%A3%BC%EC%B2%A8%EB%8B%A8%EC%A0%90&oquery=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B5%B0%EC%9E%90%EC%97%AD%EC%A0%90&tqi=iya2dwqo1LwssfM2Q%2BGsssssthl-495517&acq=%EC%9C%A0%EC%9C%A0%EC%83%A4%EB%B8%8C+%EA%B4%91%EC%A3%BC&acr=1&qdt=0"
        />
      </InformationWrapper>
    </VisitedBox>
  );
}

export default RecentVisited;
