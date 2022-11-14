import styled from "styled-components";

function InputInfo({ data: { placeholder, name, type }, handleChange }) {
  return (
    <InputWrapper>
      <Input type={type} placeholder={placeholder} name={name} onChange={handleChange} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  outline: 0;
  border: 1px #d7d7d7 solid;
  border-radius: 4px;
  box-sizing: border-box;
  color: #6a6a6a;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.01em;
`;

export default InputInfo;
