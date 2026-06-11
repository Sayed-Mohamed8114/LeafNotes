import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LightRays from "../components/LightRays";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* optional overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-teal-950 -z-20" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center">

        <Navbar />

        <main className="flex-1 flex flex-col w-full justify-center items-center">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default Layout;