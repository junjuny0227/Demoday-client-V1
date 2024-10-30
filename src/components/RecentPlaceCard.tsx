import styled from "styled-components";
import { useEffect, useState } from "react";

const Textp = styled.p`
  color: var(--main-black, #1b1b1b);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.1px;
`;

const SubText = styled.p`
  color: var(--g-3, #a1a1a1);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.1px;
  margin-left: 4px;
`;

const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0 0 24px;
`;

const AddressText = styled.div`
  color: var(--g-1, #3b3b3b);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.1px;
  padding: 3px 0 0 24px;
`;

const Category = styled.div`
  display: flex;
  width: auto;
  height: 20px;
  padding: 4px 9px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: var(--g-4, #e9e8e7);
`;

const CategoryWrapper = styled.div`
  width: 278px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 24px;
`;

const Container = styled.div`
  width: 364px;
  height: 86px;
  cursor: pointer;
`;

const InformationBox = styled.div`
  width: 278px;
  height: 86px;
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 278px;
  height: 54px;
`;

const ImgBox = styled.div`
  width: 86px;
  height: 86px;
`;

const Img = styled.img`
  width: 62px;
  height: 62px;
`;

interface RecentPlaceCardProps {
  Name: string;
  SubName: string;
  Address: string;
  ImgUrl: string;
  linkUrl: string; // 새로운 링크를 위한 추가 prop
}

const RecentPlaceCard: React.FC<RecentPlaceCardProps> = ({
  Name,
  SubName,
  Address,
  ImgUrl,
  linkUrl, // 링크 URL

}) => {
  const [placeName, setPlaceName] = useState("null");
  const [subPlaceName, setSubPlaceName] = useState("null");
  const [address, setAddress] = useState("null");
  const [img, setImg] = useState("null");

  useEffect(() => {
    setPlaceName(Name);
    setSubPlaceName(SubName);
    setAddress(Address);
    setImg(ImgUrl);
  }, []);

  const handleContainerClick = () => {
    window.open(linkUrl, "_blank"); // 새로운 탭에서 링크 열기
  };

  return (
    <Container onClick={handleContainerClick}>
      <InformationBox>
        <div>
          <TextBox>
            <MainTextWrapper>
              <Textp>{placeName}</Textp>
              <SubText>{subPlaceName}</SubText>
            </MainTextWrapper>
            <AddressText>{address}</AddressText>
          </TextBox>
          <CategoryWrapper>
            <Category>엘리베이터</Category>
            <Category>경사로</Category>
          </CategoryWrapper>
        </div>
        <ImgBox>
          <Img src={img} alt="place" />
        </ImgBox>
      </InformationBox>
    </Container>
  );
};

export default RecentPlaceCard;
