import { useState } from "react";
import Button from "./SocialButton";
import leaf from "/leaf.png";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";

export default function Nav() {
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const handleGoHome = () => {
    isLoading(true);
    setTimeout(() => {
      navigate("/");
      isLoading(false);
    }, 1500);
  };
  const handleGoLogin = () => {
    isLoading(true);
    setTimeout(() => {
      navigate("/login");
      isLoading(false);
    }, 1500);
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-9999 bg-gray-950">
          <Loader />
        </div>
      )}

      <nav className="mt-5 bg-white/15 rounded-2xl w-[70%] h-[7vh] flex items-center justify-between px-5">
        <div className="flex items-center justify-start">
          <img src={leaf} className="w-20 h-15" />
          <a onClick={handleGoHome} className="z-10 cursor-pointer">
            <h1 className="font-['Black_Ops_One'] text-xl ">Leaf-Note</h1>
          </a>
        </div>
        <div className="flex items-center justify-between gap-5 z-10">
          <a href="https://github.com/Sayed-Mohamed8114" target="_blank">
            <Button color={"oklch(44.2% 0.017 285.786)"} type={"github"} />
          </a>
          <a
            href="https://www.linkedin.com/in/sayed-mohamed-xyz8112004/"
            target="_blank"
          >
            <Button type={"linkedin"} />
          </a>
        </div>
        <button onClick={handleGoLogin}
          className="bg-teal-200/50 px-5 py-3 rounded-md  font-['Black_Ops_One'] text-xl text-gray-900 cursor-pointer transition duration-700 *:
      hover:bg-teal-200/30 hover:text-teal-50
      "
        >
          Login
        </button>
      </nav>
    </>
  );
}
