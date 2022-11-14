import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import ForgetPw from "./pages/ForgetPw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPw" element={<ForgetPw />} />
      </Routes>
    </BrowserRouter>
  );
}
// react-router-dom @6 이상이라 기존의 Switch에서 Route로 변경됨.
export default App;
