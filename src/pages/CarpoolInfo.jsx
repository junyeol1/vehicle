import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CarpoolInfo(){

    const boardId = useParams().id;
    // 게시글 정보
    const [info, setInfo] = useState([]);

    // 동승자 정보
    const [passengerId, setPassengerId] = useState([]);

    // 게시글 권한 정보
    const userId = localStorage.getItem['idx'];

    useEffect(()=>{        
        // 게시글 정보 받아오기
        fetch(`http://localhost:3001/board?id=${boardId}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setInfo(data[0]);
        })
    },[])

    return <>
        <h3>게시글 정보:</h3>
        <h4>{info.title}</h4>
        <h4>{info.id}</h4>
        <h4>{info.start}</h4>
        <h4>{info.arrival}</h4>
    </>;
}

export default CarpoolInfo;