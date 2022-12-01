import React, { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import SearchBar from "../components/SearchBar";
import { useBoardData } from "../store/boardStore";

function Carpool() {
  const [toSearch, setToSearch] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/board");
  const { selectedOption, boards, setSelectedOption } = useBoardData();
  const [currentBoards, setCurrentBoards] = useState(boards);

  //Search 컴포넌트로 넘겨줄 콜백함수?
  const getURL = (loadUrl) => {
    setUrl(loadUrl);
  };
  const onClickSearch = () => {
    const filteredBoard = boards.filter(
      (boardInfo) =>
        boardInfo.district === selectedOption.district && boardInfo.region === selectedOption.region
    );
    setCurrentBoards(filteredBoard);
  };
  const onClickLogo = () => {
    setCurrentBoards(boards);
  };
  useEffect(() => {
  //api
  }, [url]);

  //검색 주소를 콘솔에 출력
  // console.log(toSearch);

  return (
    <CarpoolWrapper>
      <NavBar />
      <MainTitle onClick={onClickLogo}>카풀 게시판</MainTitle>
      <InnerNavBarWrapper>
        <SearchBar />
        <SearchIcon onClick={onClickSearch} src="./assets/images/searchIcon.png" />
        <StyledLink to="/carpool/post">글쓰기</StyledLink>
      </InnerNavBarWrapper>
      <BoardWrapper>
        {currentBoards.map((board) => (
          <Thumbnail key={board.id} boardInfo={board} />
        ))}
      </BoardWrapper>
    </CarpoolWrapper>
  );
}
const SearchIcon = styled.img`
  width: 20px;
  background-color: white;
`;
const BoardWrapper = styled.ul`
  list-style: none;
  padding-left: 0px;
  height: 67vh; 
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 92vw; 
  margin: 10px auto;
  overflow: scroll;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-color: orange;
  padding: 0px 7px;
  border-radius: 3px;
`;

const InnerNavBarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;
const MainTitle = styled.p`
  font-size: 23px;
  color: white;
  font-weight: 900;
  margin-left: 7px;
`;

const CarpoolWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(54, 58, 179);
`;

export default Carpool;
