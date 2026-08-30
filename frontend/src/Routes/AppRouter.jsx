import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/Components/Layout/MainLayout";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "@/Pages/Login/LoginPage";
import RegisterPage from "@/Pages/Register/RegisterPage";
import ToDoPage from "@/Pages/ToDoPage/ToDoPage";
import ProtectedRoute from "@/Utils/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route
          path={"/todos"}
          element={
            <ProtectedRoute>
              <ToDoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
