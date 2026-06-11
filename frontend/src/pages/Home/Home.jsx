import Button from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("signup");
    }, 2000);
    if (loading) {
      return <Loader />;
    }
  };
  return (
    <>
      {loading && <Loader />}

      <div className="items-center flex flex-col justify-center  p-7 gap-10">
        <div className="items-center flex flex-col justify-center p-0 sm:p-4 md:p-7  lg:p-10">
          <h1 className="text-5xl md:text-7xl font-extrabold font-serif bg-linear-to-r text-transparent bg-clip-text from-teal-600 to-slate-200">
            LeafNote
          </h1>
          <br />
          <h4
            className="text-md sm:text-lg md:text-3xl font-serif font-extralight  bg-linear-to-r text-transparent text-center
         bg-clip-text from-teal-600 to-slate-50 px-5"
          >
            Make your day easier by organizing it , Make it remarkable , able to
            maintance it. <br /> All in one place
          </h4>
        </div>
        <div className="items-center justify-center flex flex-col sm:flex-row gap-1 sm:gap-5">
          <p className="bg-teal-800 rounded-full p-5 text-xl text-teal-50 font-serif font-bold ">
            Hello Firend.
          </p>
          <Button onClick={handleSignUp} />
        </div>
      </div>
    </>
  );
};

export default Home;
