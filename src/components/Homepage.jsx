
import React from "react";
import FruitBg from "../assets/img.svg";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
  <div
    className="relative h-screen bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url(${FruitBg})` }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/70" />

    {/* Main content */}
    <div className="relative flex flex-col items-center justify-center h-full px-4 sm:px-6">

      {/* Image + logo */}
      <div className="relative w-full max-w-[420px] mb-4">
        <img
          src={FruitBg}
          alt="fruit"
          className="rounded-xl w-[80%] sm:w-[85%] max-w-[260px] sm:max-w-[300px] mx-auto"
        />

        <img
          src={logo}
          alt="logo"
          className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-24 h-24 sm:w-32 sm:h-32
            rounded-full backdrop-blur-sm
          "
        />
      </div>

      {/* Text */}
      <h1 className="text-white text-xl sm:text-3xl lg:text-4xl font-semibold text-center">
        Welcome to Chef Kitchen
      </h1>

      <p className="text-white/70 text-sm sm:text-base text-center max-w-xs sm:max-w-sm mt-2">
        Check out the awesome food experience! It's super fresh, quick, and oh-so tasty!
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/menu")}
        className="
          bg-orange-400 hover:bg-orange-300
          active:scale-95 transition
          text-white font-light
          py-3 px-10 sm:px-20
          rounded-lg shadow-md
          mt-4
          w-full sm:w-auto
        "
      >
        Explore Menu
      </button>

    </div>
  </div>
);

};

export default Homepage;
