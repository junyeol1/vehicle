import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"; 
import { useState } from "react";

import LoginInput from "../components/login/LoginInput";

function Login() {
  const navigate = useNavigate();
  const LoginFormData = [
    {
      placeholder: "아이디를 입력해주세요.",
      name: "userId",
      type: "text",
    },
    {
      placeholder: "비밀번호를 입력해주세요.",
      name: "password",
      type: "password",
    },
  ];
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    const isValidate = values.userId === "testId" && values.password === "testPw" ? true : false;
    // const isValidate = axios ~ 사용하여 백엔드 APi 연결.
    if (isValidate) {
      // 로컬스토리지를 사용해서 로그인 후에 페이지를 닫았다가 켜도 로그인상태가 유지 됨.
      window.localStorage.setItem("currentUserId", "user1");
      navigate("/");
    } else {
      setError("ID 또는 PW가 올바르지 않습니다.");
    }
    event.preventDefault();
  };
  return (
    <LoginContainer>
      <LoginForm>
        {LoginFormData.map((data) => (
          // key={} 값이 없어서 콘솔 경고뜸
          <LoginInput key={data.name} data={data} handleChange={(e) => handleChange(e)} />
        ))}
        <ErrorText>{error}</ErrorText>
        <SubmitBtn onClick={handleSubmit} value={values.userId}>
          로그인
        </SubmitBtn>
        <Registered>
          <StyledLink to="/signup">회원가입하기</StyledLink>
          <StyledLink to="/forgetPw">비밀번호 찾기</StyledLink>
        </Registered>
      </LoginForm>
    </LoginContainer>
  );
}
const ErrorText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.01em;
  color: #e50303;
  margin-top: 5px;
  display: flex;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 8px;
`;
const Registered = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const SubmitBtn = styled.button`
  margin-top: 12px;
  padding: 13px;
  width: 100%;
  text-transform: uppercase;
  outline: 0;
  background: ${(props) => (props.value === "" ? "#BCBCBC" : "#FF9C2C")};

  border: 0;
  border-radius: 4px;
  color: #ffffff;
  -webkit-transition: all 0.3 ease;
  transition: all 0.1s ease-out;
  cursor: pointer;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 0.03em;
  
`;

const LoginContainer = styled.div.attrs({ className: "SignUp" })`
  display: flex;
  height: 640px;
  background-color: #2D2D92;
  font-family: "Pretended";
`;

const LoginForm = styled.div`
  width: 55%;
  margin: auto;
  text-align: center;
  font-style: normal;
  line-height: 19px;
`;

export default Login;