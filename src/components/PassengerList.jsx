import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PassengerList(props){

    const passengerId = props.passengerId; // 동승신청자, 댓글 주인 id
    const isBoardWriter = props.userCase === 1; // userCase가 게시글 작성자인 경우 true 저장
    const boardId = useParams().id;
    const [passengerInfo,setpassengerInfo] = useState([]);

    // 게시글 권한 정보(접속한 사람id)
    // const userId = localStorage.getItem['idx'];

    /* 개발할 때 CarpoolInfo와 같은 userId인지 확인하면서 개발할 것 */
    const userId = '2018250033'; // 임시 사용 // 게시글 작성자 역할
    // const userId = '2018250233'; // 임시 사용 // 외부인 역할 - 동승신청 클릭
    // const userId = '2022330044'; // 임시 사용 // 동승자 역할


    useEffect(()=>{       
        // 댓글 주인의 회원 정보 가져오기 
        fetch(`http://localhost:3001/account?id=${passengerId}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setpassengerInfo(data[0]);
            console.log("passengerinfo:",data[0]);
        })
    },[passengerId])

    const deleteApply = (e)=>{
        e.preventDefault();
        // 동승 신청 삭제 요청
        fetch(`http://localhost:3001/passenger/${boardId+passengerId}`, {method:"DELETE"})
        .then(res=>{
            if(res.ok){
                alert("신청이 취소되었습니다.")
                window.location.reload();
            }
        })
    }

    return <>
        <h3>댓글</h3>
        {/* 신청 별 취소 권한 설정 해야함*/}
        {   // 게시글 작성자 이거나, 현재 로그인 아이디와 신청자 id가 같은 경우
            // => 게시글 작성자와 신청한 사람은 삭제 버튼이 보임
            isBoardWriter || userId === passengerId?
            <button onClick={deleteApply}>삭제</button>:
            null
        }
        <h4>{passengerId}</h4>
        <h4>id: {passengerInfo.id}</h4>
        <h4>phoneNum: {passengerInfo["phoneNum"]}</h4>
        <h4>name: {passengerInfo.name}</h4>
        <h4>sex: {passengerInfo.sex}</h4>
    </>
}

export default PassengerList;