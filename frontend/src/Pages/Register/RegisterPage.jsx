import Loader from "@/Components/Common/Loader";
import RegisterForm from "@/Components/Forms/registerForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-9999 bg-gray-950">
          <Loader />
        </div>
      )}
      <section className=" w-full p-5 md:p-10 flex items-center justify-center bg-gray-950 text-teal-50 gap-10 min-h-screen ">
        <div className=" w-[99%] lg:w-[50%] bg-gray-900/80 p-5 md:p-10 rounded-2xl shadow-teal-900 shadow-xl flex items-center flex-col-reverse md:flex-row justify-center gap-10 h-auto md:h-[70%] ">
          <div className=" h-auto w-full md:w-[60%] items-center justify-center flex gap-10 flex-col ">
            <h2 className=" font-['Black_Ops_One'] text-center md:text-start text-2xl md:text-5xl ">
              Join leaf-Note
            </h2>
            <p className=" text-teal-200/50 text-sm text-center md:text-start md:text-lg leading-5 font-semibold ">
              Create your leaf-Note account and start managing your daily tasks
              and todos with a simple and beautiful experience.
            </p>
            <div className=" mt-2 md:mt-10 gap-2 flex w-full items-center justify-evenly ">
              <button
                onClick={() => handleNavigation("/")}
                className=" text-sm md:text-sm lg:text-lg text-teal-300 underline underline-offset-3 hover:text-teal-50 transition duration-700 "
              >
                Back to home?
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className=" text-sm md:text-sm lg:text-lg text-teal-100 underline underline-offset-3 hover:text-gray-200 transition duration-700 "
              >
                Already have an account?
              </button>
            </div>
          </div>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
