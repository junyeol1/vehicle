import React, { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import Search from "../components/Search";
import styled from "styled-components";
import {Link} from "react-router-dom";

function Carpool(){

    const [boards, setBoards] = useState([]);
    const [toSearch, setToSearch] = useState([]);
    const [url, setUrl] = useState("http://localhost:3001/board");
    
    //Search 컴포넌트로 넘겨줄 콜백함수?
    const getURL = (loadUrl) => {
        setUrl(loadUrl);
    };

    useEffect(()=>{
        // 페이지 처음 렌더링 할때 게시글 목록 불러오기(썸네일 보여주기 위해)
        fetch(url)
		.then(res=>{
			return res.json();
		})
		.then(data=>{
			setBoards(data);
		})
        
        // 전체 게시글 정보를 검색 컴포넌트로 넘기기 위해
        fetch("http://localhost:3001/board")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setToSearch(data);
        })
    },[url])
    
    //검색 주소를 콘솔에 출력
    console.log(toSearch);

    return <>
        <h1>카풀 페이지</h1>
        <Posting>
            <Link to="/carpool/post">글쓰기</Link>
        </Posting>
        <SearchWrapper>
            <Search keywords={toSearch} parentFunction={getURL}></Search>
        </SearchWrapper>
        <ul>
            {boards.map(board=>(
                (<Thumbnail key={board.id} info={board} />)
            ))}
        </ul>
    </>;
}

const SearchWrapper = styled.div`
    padding: 40px;
`

const Posting = styled.div`
    float: right;
    display: block
    margin: 10px;
    width: 50px;
`

export default Carpool;