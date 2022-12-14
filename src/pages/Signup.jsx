import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

import SignUpInput from "../components/signUp/SignUpInput";

// 회원가입 폼 사용자 입력 데이터
function Signup() {
  const navigate = useNavigate();
  const SignUpFormData = [
    {
      placeholder: "ex)학번 20xxxxxx",
      name: "userId",
      type: "text",
      title: "아이디(학번)",
    },
    {
      placeholder: "ex) 영문과 숫자를 혼합",
      name: "password",
      type: "password",
      title: "비밀번호",
    },
    {
      placeholder: "비밀번호를 한번 더 입력해 주세요.",
      name: "passwordCheck",
      type: "password",
      title: "비밀번호 확인",
    },
    {
      placeholder: "ex) 홍길동",
      name: "name",
      type: "text",
      title: "이름",
    },
    {
      placeholder: "ex) 19990101",
      name: "birthDate",
      type: "text",
      title: "생년월일",
    },
    {
      placeholder: "ex) asd@naver.com",
      name: "email",
      type: "text",
      title: "이메일",
    },
    {
      placeholder: "ex) 01012345678",
      name: "phoneNum",
      type: "text",
      title: "전화번호",
    },
    {
      placeholder: "ex) 컴퓨터공학과",
      name: "major",
      type: "text",
      title: "학과",
    },
  ];
  const [values, setValues] = useState({
    userId: "",
    password: "",
    passwordCheck: "",
    name: "",
    birthDate: "",
    email: "",
    phoneNum: "",
    major: "",
  });

  const [errors, setErrors] = useState({});
  const [isFill, setIsFill] = useState(false);

  const handleSubmit = (event) => {
    const valueNames = ["userId", "password", "name", "birthDate", "email", "phoneNum", "major"];
    let isValidate = true;
    valueNames.forEach((name) => {
      if (errors[name] !== "") {
        isValidate = false;
      }
    });

    if (isValidate) {
      // 작성 정보를 db에 보내는 API 추가 ....
      navigate("/login");
    } else {
      alert("회원가입 형식이 올바르지 않습니다. 다시 확인해주세요.");
    }
    event.preventDefault();
  };

  useEffect(() => {
    const { userId, password, name, birthDate, email, phoneNum, major } = values;
    if (
      !(
        userId === "" ||
        password === "" ||
        name === "" ||
        birthDate === "" ||
        email === "" ||
        phoneNum === "" ||
        major === ""
      )
    ) {
      setIsFill(true);
    }
  }, [values]);

  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <SignUpForm>
        {SignUpFormData.map((data) => (
          <SignUpInput
            key={data.name}
            data={data}
            setValues={setValues}
            values={values}
            setErrors={setErrors}
          />
        ))}
        <GenderContainer>
          <Gender>성별</Gender>
          <GenderOption type="radio" name="gender" value="남자" id="male" checked />
          <GenderLabel for="male">남자</GenderLabel>
          <GenderOption type="radio" name="gender" value="여자" id="female" />
          <GenderLabel for="female">여자</GenderLabel>
        </GenderContainer>

        <SubmitBtn disabled={!isFill} onClick={handleSubmit} value={isFill}>
          회원가입 완료
        </SubmitBtn>
      </SignUpForm>
    </SignUpContainer>
  );
}
const Gender = styled.div`
  text-align: left;
`;
const GenderLabel = styled.label`
  margin-right: 7px;
`;
const GenderContainer = styled.div`
  text-align: left;
  margin-bottom: 1px;
`;
const GenderOption = styled.input`
  margin-right: 3px;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  &:checked {
    border: 0.4em solid orange;
  }
  transition: border 0.5s ease-in-out;
`;
const Title = styled.div`
  width: 100%;
  background-color: #ff9c2c;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  padding: 8px 0px;
`;

const SubmitBtn = styled.button`
  margin-top: 8px;
  margin-bottom: 5px;
  padding: 3px;
  width: 100%;
  text-transform: uppercase;
  outline: 0;
  background: ${({ value }) => (value ? "#FF9C2C" : "#BCBCBC")};

  border: 0;
  border-radius: 4px;
  color: #ffffff;
  -webkit-transition: all 0.3 ease;
  transition: all 0.1s ease-out;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.03em;
`;

const SignUpContainer = styled.div.attrs({ className: "SignUp" })`
  display: flex;
  flex-direction: column;
  height: 640px;
  background-color: #2d2d92;
  font-family: "Pretended";
  color: white;
`;

const SignUpForm = styled.div`
  width: 70%;
  margin: auto;
  text-align: center;
  font-style: normal;
  line-height: 19px;
`;

export default Signup;
