import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Thumbnail({ boardInfo }) {
  return (
    <StyledLink to={`/carpool/${boardInfo.id}`}>
      <ThumbnailWrapper>
        <ThumbnailImage type={boardInfo.type} src={`./assets/images/${boardInfo.type}.png`} />
        <ContentWrapper to={`/carpool/${boardInfo.id}`}>
          <div>{boardInfo.title}</div>
          <div>출발지: {boardInfo.departures}</div>
          <div>목적지: {boardInfo.arrivals}</div>
          <div>출발 시간 {boardInfo.departureTime}</div>
          <div>{boardInfo.time}</div>
        </ContentWrapper>
        <PickUpInfo>
          <div>{boardInfo.type === "driver" ? "탑승인원" : "픽업하기"}</div>
          <div>
            {boardInfo.type === "driver"
              ? `${boardInfo.currentPassengers}/${boardInfo.totalPassengers}`
              : `${boardInfo.totalPassengers}명`}
          </div>
        </PickUpInfo>
      </ThumbnailWrapper>
    </StyledLink>
  );
}
const PickUpInfo = styled.div`
  background-color: orange;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 18%;
`;
const ContentWrapper = styled.div`
  color: black;
  font-weight: 900;
  font-size: 14px;
  margin: 3px 10px;
  text-align: center;
  line-height: 22px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 5px;
`;
const ThumbnailImage = styled.img`
  width: ${(props) => (props.type === "driver" ? "60px" : "85px")};
  margin: ${(props) => (props.type === "driver" ? "auto -7px auto 12px" : "0 -25px 0 0")};
  height: ${(props) => (props.type === "driver" ? "65px" : "auto")};
`;
const ThumbnailWrapper = styled.li`
  border: 2px solid;
  margin: 3px;
  display: flex;
`;

export default Thumbnail;
