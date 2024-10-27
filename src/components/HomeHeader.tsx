import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 412px;
  height: 196px;
  background-color: white;
  border-radius: 0 0 20px 20px;
  z-index = -1;
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
`;

const SearchInput = styled.input`
  width: 300px;
  height: 24px;
  z-index: 1;
  border: 0;
  background-color: white;
  color: rgba(144, 144, 144, 1);

  &:focus {
    outline: none;
  }
`;

const TextWrapper = styled.div``;

function HomeHeader() {
  return (
    <HeaderWrapper>
      <TextWrapper>
        <Text>안녕하세요</Text>
        <Text>오늘은 어디로 가볼까요?</Text>
      </TextWrapper>
      <SearchBar>
        <SearchInput type="text" placeholder="목적지를 입력해 주세요" />
      </SearchBar>
    </HeaderWrapper>
  );
}

export default HomeHeader;
