import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import PassengerList from "../components/PassengerList";

function CarpoolInfo(){

    // 주소에서 파라미터 받아오기(게시글 id)
    const boardId = useParams().id;

    // 게시글 정보
    const [info, setInfo] = useState([]);
    // 동승자 목록
    const [passengerList, setPassengerList] = useState([]);

    // 게시글 권한 정보(접속한 사람id)
    // const userId = localStorage.getItem['idx'];

    /* 개발할 때 PassengerList와 같은 userId인지 확인하면서 개발할 것 */
    const userId = '2018250033'; // 임시 사용 // 게시글 작성자 역할
    // const userId = '2018250233'; // 임시 사용 // 외부인 역할 - 동승신청 클릭
    // const userId = '2022330044'; // 임시 사용 // 동승자 역할

    useEffect(()=>{        
        // 게시글 정보 받아오기
        fetch(`http://localhost:3001/board?id=${boardId}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setInfo(data[0]);
        })

        // 게시글 동승자 목록 받아오기
        fetch(`http://localhost:3001/passenger?boardId=${boardId}`)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setPassengerList(data);
            console.log(data.map(a=>a.userId));
        })

    },[boardId])
    
    // userCase 접속 id에 따라 다른 컴포넌트를 보여주기 위함
    // 1 은 작성자, 2: 댓글 작성자(동승 신청자), 3: 외부인(아직 게시글과 관련 없는 사람)
    let userCase;
    if(userId === info.writer){
        userCase = 1;
    // 동승자 리스트를 검사해서 현재 userId가 들어 있는지 검사
    }else if(passengerList.map(passenger=>passenger.userId).includes(userId)){
        userCase = 2;
    }else{
        userCase = 3;
    }
    
    // 동승 신청 버튼
    const addPassenger = (e)=>{
        e.preventDefault();

        // body에 들어갈 내용
        const info = {
            "id": boardId+userId, // 임시 기본키
			"boardId": boardId,
            "userId": userId
		}

        fetch(`http://localhost:3001/passenger`,{
		method: 'POST',
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(info)
	}).then(res=>{
		if (res.ok){
			alert('동승 신청 완료')
            // passengerList에 방금 신청한 사람 추가, 
            // 추가한 사람 회원 정보를 PassengerList 컴포넌트에서 사용할 거라  
            // 추가한 사람 회원 정보가 미리 있어야 나중에 오류가 나지 않음
            setPassengerList(...passengerList, info) 
            window.location.reload();
		}
	})
    }

    // 게시글 삭제 버튼
    const delBoard = (e) =>{
        // 지금 여기서 삭제 해야할게 게시글 + 게시글에 달려있는 동승자 목록이라 어케 해야할 지 고민
        e.preventDefault();
        fetch(`http://localhost:3001/board/${boardId}`, {method:"DELETE"})
        .then(res=>{
            if(res.ok){
                alert("게시글이 삭제되었습니다.")
                window.location.replace("/carpool");
            }
        })
    }

    return <>
        <h3>게시글 정보:</h3>
        <div>
            {/* 로그인 된 id가 writer(게시글 작성자)id와 같다면 게시글에 대한 삭제 수정버튼 보이고 아니면 null */}
            {userCase === 1 ? <div>
                {/* <button onClick={deletBoard}>삭제</button>
                <button onClick={updateBoard}>수정</button> */}
                <button onClick={delBoard}>삭제</button>
                <button>수정</button>
                </div>:
                null
            }
        </div>
        <h4>title: {info.title}</h4>
        <h4>id: {info.id}</h4>
        <h4>startDetail: {info.start}</h4>
        <h4>arrivalDetail: {info.arrival}</h4>
        <div>동승자 수: {passengerList.length} / info.maxPassenger</div>
        <div>usercase: {userCase}</div>
        <div>passengerlist: {typeof passengerList}</div>

        <hr/> {/* 글과 댓글 구분선 */}
        <ul>
            {/*동승 신청 목록 보여주는 곳: 여기서 댓글 수정, 삭제 도 추가 해야함*/}
            {passengerList.map(passenger=>{
                // 댓글 하나씩 li 태그로 묶임
                return <li key={passenger.id}>
                    {userCase === 3? //userCase가 3이면 (외부인): 내용비밀 로만 보이고, 아닌경우엔 댓글 내용이 보임
                    <div> 내용 비밀</div> : 
                    <PassengerList passengerId={passenger.userId} userCase={userCase}/>}
                </li>
            })}
        </ul>
            {/* 동승 신청 버튼: 외부인 일 경우에만 버튼이 보임*/}
            {userCase === 3? <button disabled={
                passengerList.length < 3 ? "" : "disable" // 3은 임의의 숫자, info.maxPassenger
            } onClick={addPassenger}>동승 신청</button>: null}
    </>;
}

export default CarpoolInfo;