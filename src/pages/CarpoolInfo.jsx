import React from "react";
import { useParams } from "react-router-dom";

function CarpoolInfo(){
    const id = useParams().id;
    return <h1>{id} 게시글</h1>;
}

export default CarpoolInfo;