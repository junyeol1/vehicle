import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import ForgetPw from "./pages/ForgetPw";
import Taxi from "./pages/Taxi";
import CarPool from "./pages/CarPool";
import MyInfo from "./pages/MyInfo";
/*import NonMemberRoute from "./route/NonMemberRoute";
import IsLoginRoute from "./route/IsLoginRoute";*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPw" element={<ForgetPw />} />
        <Route path="/carPool" element={<CarPool />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
// 접근제한 일단 제외.
// react-router-dom @6 이상이라 기존의 Switch에서 Route로 변경됨.
export default App;