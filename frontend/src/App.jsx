import {  Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";


function App() {
  return (
    <Routes>
      {/*main layout*/}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
