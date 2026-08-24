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

      <section
        className="w-full p-10 flex items-center h-screen
        justify-center bg-gray-950 text-teal-50 gap-10"
      >
        <div
          className="w-[50%] bg-gray-900/80 p-10 rounded-2xl
          shadow-teal-900 shadow-xl flex items-center
          justify-center gap-10 h-[70%]"
        >
          {/* Left Side */}
          <div
            className="h-auto w-[50%] items-center
            justify-center flex gap-10 flex-col"
          >
            <h2 className="font-['Black_Ops_One'] text-5xl">
              Join leaf-Note
            </h2>

            <p
              className="text-teal-200/50
              text-lg leading-5
              font-semibold"
            >
              Create your leaf-Note account and start managing
              your daily tasks and todos with a simple and
              beautiful experience.
            </p>

            <div
              className="mt-10 flex w-full
              items-center justify-evenly"
            >
              <button
                onClick={() => handleNavigation("/")}
                className="
                  text-lg
                  text-teal-300
                  underline
                  underline-offset-3
                  hover:text-teal-50
                  transition
                  duration-700
                "
              >
                Back to home?
              </button>

              <button
                onClick={() => handleNavigation("/login")}
                className="
                  text-lg
                  text-teal-100
                  underline
                  underline-offset-3
                  hover:text-gray-200
                  transition
                  duration-700
                "
              >
                Already have an account?
              </button>
            </div>
          </div>

          {/* Register Form */}
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
