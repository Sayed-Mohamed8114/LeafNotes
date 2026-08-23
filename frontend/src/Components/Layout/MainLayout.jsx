import { Outlet } from "react-router-dom";
import Nav from "../UI/Nav";

export default function MainLayout() {
  return (
    <div className="flex bg-gray-950 items-center justify-center w-full min-h-screen overflow-x-hidden flex-col text-white">
      <Nav />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
