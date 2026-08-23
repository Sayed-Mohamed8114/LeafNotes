import { useNavigate } from "react-router-dom";
import GradientWaves from "../UI/GradientWaves";
import { useEffect, useState } from "react";
import Loader from "../Common/Loader";

export default function Hero() {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const handleGetStarted = () => {
    isLoading(true);
    setTimeout(() => {
      isLoading(false);
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-9999 bg-gray-950">
          <Loader />
        </div>
      )}
      <section className="flex-1 h-[90.5vh] relative items-center justify-center flex">
        <div className="absolute inset-0">
          <GradientWaves
            horizonColor="#0be9a1"
            waveColor="#04100c"
            crestColor="white"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            mouseInteraction={false}
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>
        <div className="relative z-10 flex h-full items-center px-10 md:px-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-teal-200">
              Stay organized
            </p>

            <h1 className="text-5xl font-bold leading-tight text-teal-100 md:text-7xl">
              Turn your
              <span className="text-teal-300"> thoughts </span>
              into action.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Leaf Notes is a simple and focused todo app that helps you
              organize your tasks, keep track of what matters, and get things
              done without the unnecessary complexity.
            </p>

            <div className="mt-5 ">
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-teal-50 cursor-pointer duration-700 transition px-6 py-3 w-[40%]  text-teal-900 font-extrabold 
             hover:bg-gray-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
