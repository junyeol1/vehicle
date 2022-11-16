import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import ForgetPw from "./pages/ForgetPw";
import Taxi from "./pages/Taxi";
import Carpool from "./pages/Carpool";
import CarpoolInfo from "./pages/CarpoolInfo";
import CarpoolPost from "./pages/CarpoolPost";
import NonMemberRoute from "./route/NonMemberRoute";
import IsLoginRoute from "./route/IsLoginRoute";

function App() {
  // localStorage에 있는 계정(id)를 불러옴
  const account = localStorage.getItem('idx');
  console.log(account);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPw" element={<ForgetPw />} />
        <Route path="/carpool" element={<Carpool />} />
        <Route path="/carpool/post" element={<CarpoolPost />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/carpool/:id" element={<CarpoolInfo />} />
      </Routes>
      
      {/* 접근제한 만들어두니까 개발할 때 불편함 
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<NonMemberRoute account={account} component={<Login />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPw" element={<NonMemberRoute account={account} component={<ForgetPw />} />} />
        <Route path="/carpool" element={<IsLoginRoute account={account} component={<Carpool />} />} />
        <Route path="/taxi" element={<IsLoginRoute account={account} component={<Taxi />} />} />
      </Routes> */}
    </BrowserRouter>
  );
}
// react-router-dom @6 이상이라 기존의 Switch에서 Route로 변경됨.
export default App;
