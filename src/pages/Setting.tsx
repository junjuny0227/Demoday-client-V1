import Navigation from "../components/Navigation";
import styled from "styled-components";

const SettingWrapper = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;

const SettingSection = styled.section`
  font-size: 13px;
  margin: 12px 24px;
  color: #a1a1a1;
`;

const SettingMenu = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin: 12px 24px;
  p {
    font-size: 13px;
    color: #625d5b;
  }
`;

const Setting = () => {
  return (
    <>
      <SettingWrapper>
        <SettingSection>개인 설정</SettingSection>
        <SettingMenu>
          글꼴 크기 설정
          <p>현재 글꼴 크기</p>
        </SettingMenu>
        <SettingMenu>워치 연결 상태</SettingMenu>
        <SettingMenu style={{ marginBottom: "32px" }}>테마</SettingMenu>
        <SettingSection>계정 보안</SettingSection>
        <SettingMenu>비밀번호 변경</SettingMenu>
        <SettingMenu style={{ color: "red" }}>로그아웃</SettingMenu>
      </SettingWrapper>
      <Navigation />
    </>
  );
};

export default Setting;
