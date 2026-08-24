import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/Components/Layout/MainLayout";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "@/Pages/Login/LoginPage";
import Register from "@/Pages/Register/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
