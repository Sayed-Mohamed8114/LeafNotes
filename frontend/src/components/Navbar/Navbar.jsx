import { Link } from "react-router-dom";
import MainLogo from "../../../public/MainLogo.png";
const Navbar = () => {
  return (
    <nav className="w-[90%] sm:w-[90%] md:w-[80%] lg:w-[75%] h-[7vh]  md:h-[10vh] flex items-center justify-between rounded-full mt-0.5 mb-2 bg-white/10 shadow-md backdrop-blur-md border-b border-white/5">
      <div className="flex gap-0.5 md:gap-1 items-center  justify-center  md:justify-evenly">
        <img src={MainLogo} alt="logo" className="w-25 h-25 sm:h-35 sm:w-35" />
        <span className="bg-linear-to-r from-teal-900 to-slate-300 bg-clip-text text-transparent text-extrabold text-sm sm:text-2xl md:text-4xl">Leaf Note</span>
      </div>
      <ul className="flex items-center p-4 ">
        <li className="items-center flex justify-center gap-1.5">
          <Link
            to="/login"
            className="bg-linear-to-r from-teal-900 to-slate-300 bg-clip-text text-transparent text-extrabold text-xl md:text-4xl hover:underline underline-offset-6 transition duration-500 ease-in-out"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
