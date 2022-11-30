import styled from "styled-components";

import React from "react";
import { Link } from "react-router-dom";

function Thumbnail(props){
    const info = props.info;

    return <li>
        <LinkWrapper>
            <Link to={`/carpool/${info.id}`}>
                <div>id: {info.id}</div>
                <div>출발: {info.start}</div>
                <div>도착: {info.arrival}</div>
                <div>title: {info.title}</div>
                <div>출발 시간: {info.date}</div>
                <div>{info.time}</div>
            </Link>
        </LinkWrapper>
    </li>;
}

const LinkWrapper = styled.div`
    border : 1px solid;
    width : 90%;
    margin : 20px;
`;

export default Thumbnail;