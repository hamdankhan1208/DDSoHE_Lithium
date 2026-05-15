import Spline from "@splinetool/react-spline";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleAnalyticsClick = () => {
    navigate("/dashboard/pageOne");
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/k8uV-3p90IFmy3nq/scene.splinecode" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-start max-w-2xl ml-80 mt-72 space-y-8 text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            ⚡
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Data Driven State of Health of Lithium Cells
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          Powering the future — intelligently. DDSoHE connects innovation with
          precision, transforming the way you interact with energy, automation,
          and data.
        </p>

        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-3 rounded-2xl bg-white text-black text-sm font-semibold transition hover:bg-gray-200"
            onClick={handleAnalyticsClick} // <-- Add onClick to navigate
          >
            Analytics
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
