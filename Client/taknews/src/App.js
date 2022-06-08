import "./App.css";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <div className="App">
  <Registration />
  <Login />
</div>; */
}
