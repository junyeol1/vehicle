import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/navBar/navBar";
import { useBoardData } from "../store/boardStore";

function CarpoolInfo() {
  const id = useParams().id;
  const [postInfo, setPostInfo] = useState();
  // 동승자, 탑승자 정보 저장하는 변수
  const [personalInfo, setPersonalInfo] = useState(["내용1", "내용2", "내용3", "내용4"]);
  const { boards, setBoards } = useBoardData();
  const currentData = boards[id];
  useEffect(() => {
    // api로 id에 해당하는 포스트 정보 불러움
    // 예시 코드
    // const postData = axios.get(~~~)
    // setPostInfo(postData);
  });
  return (
    <CarpoolInfoWrapper>
      <NavBar />
      <ContentWrapper>
        <ButtonWrapper>
          <BasicButton>수정</BasicButton>
          <BasicButton>삭제</BasicButton>
        </ButtonWrapper>
        <StyledContent width={"100%"}>{currentData.title}</StyledContent>
        <LocateInfo>
          <BasicContent>{currentData.district}</BasicContent>
          <BasicContent>{currentData.region}</BasicContent>
          <BasicContent>{currentData.departures}</BasicContent>
        </LocateInfo>
        <LocateInfo>
          <BasicContent>{currentData.arrivalsDst}</BasicContent>
          <BasicContent>{currentData.arrivalsRegion}</BasicContent>
          <BasicContent>{currentData.arrivals}</BasicContent>
        </LocateInfo>
        <DepartureTime>{currentData.departureTime}</DepartureTime>
        <WriterInfo>
          <div>
            <Img src={`/assets/images/${currentData.type}.png`} />
            <StyledContent width={"100%"}>{currentData.carType}</StyledContent>
          </div>
          <StyledContent width={"70%"}>DB에 저장한 유저 정보</StyledContent>
        </WriterInfo>
        <StyledContent width={"100%"} height={"50px"}>
          {currentData.content}
        </StyledContent>
        <StyledButton width={"100%"} height={"30px"}>
          {currentData.type === "driver" ? "동승하기" : "픽업하기"}
        </StyledButton>
      </ContentWrapper>
      <Splitter />
      <PersonalInfo>
        {personalInfo.map((info) => {
          return (
            <InfoContainer>
              {info}
              <br />
              학과: 컴퓨터공학과
            </InfoContainer>
          );
        })}
      </PersonalInfo>
    </CarpoolInfoWrapper>
  );
}

export default CarpoolInfo;
const DepartureTime = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 25px;
`;
const InfoContainer = styled.div`
  width: 80%;
  height: 70px;
  background-color: white;
  margin-top: 15px;
  text-align: center;
`;
const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 23vh;
  overflow: scroll;
`;
const Splitter = styled.div`
  width: 83%;
  height: 3px;
  background-color: white;
  margin: auto;
  margin-top: 5px;
`;
const Img = styled.img`
  width: 70px;
`;

const WriterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LocateInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
`;

const BasicContent = styled.div`
  background-color: white;
  width: 30%;
  text-align: center;
`;

const StyledContent = styled(BasicContent)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
const BasicButton = styled.button`
  background-color: orange;
  color: white;
  border: 0;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
`;
const StyledButton = styled(BasicButton)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: 16px;
`;
const ContentWrapper = styled.div`
  margin: auto;
  margin-top: 15px;
  width: 80vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  justify-content: space-between;
`;
const CarpoolInfoWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(54, 58, 179);
`;
