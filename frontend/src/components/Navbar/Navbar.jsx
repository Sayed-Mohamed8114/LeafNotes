import { Link, useLocation } from "react-router-dom";
import MainLogo from "/MainLogo.png";

const Navbar = () => {
  const { pathname } = useLocation();
  let linkTo = "/";
  let label = "Home";

  if (pathname === "/login") {
    linkTo = "/";
    label = "Home";
  } else if (pathname === "/signup") {
    linkTo = "/";
    label = "Home";
  } else {
    linkTo = "/login";
    label = "Login";
  }

  return (
    <nav className="w-[90%] h-[7vh]  md:h-[10vh] flex items-center justify-between rounded-2xl mt-1 mb-2 bg-white/10 shadow-md backdrop-blur-md border-b border-white/5">
      <div className="flex gap-0.5 md:gap-1 items-center  justify-center  md:justify-evenly">
        <Link to={"/"}>
          <img
            src={MainLogo}
            alt="logo"
            className="w-25 h-25 sm:h-35 sm:w-35"
          />
        </Link>

        <span className="bg-linear-to-r from-teal-900 to-slate-300 bg-clip-text text-transparent text-extrabold text-sm sm:text-2xl md:text-4xl">
          Leaf Note
        </span>
      </div>
      <ul className="flex items-center p-4 ">
        <li className="items-center flex justify-center gap-1.5">
          <Link
            to={linkTo}
            className="bg-linear-to-r from-teal-900 to-slate-300 bg-clip-text 
          text-transparent font-extrabold text-xl md:text-4xl hover:underline underline-offset-4 transition duration-500 ease-in-out"
          >
            {label}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
