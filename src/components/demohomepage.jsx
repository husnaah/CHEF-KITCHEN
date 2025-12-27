// import React from "react";
// import FruitBg from "../assets/img.svg";
// import logo from "../assets/logo.svg";
// import { useNavigate } from "react-router-dom";


// const Homepage = () => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="relative h-screen bg-cover bg-center overflow-hidden"
//       style={{ backgroundImage: `url(${FruitBg})` }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/70" />

//       {/* Main content */}
//       <div className="relative flex flex-col items-center justify-start h-full px-6">
//        <div className="relative w-full max-w-[500px] mt-20">

//   {/* Fruit image */}
//   <img
//     src={FruitBg}
//     alt="fruit"
//     className="rounded-xl w-[90%] max-w-[320px] mx-auto "
//   />

//   {/* Logo perfectly centered on top */}
//   <img
//     src={logo}
//     alt="logo"
//     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full backdrop-blur-sm"
//   />

// </div>


//           {/* Fruit Image (shrunk to fit screen) */}
       
        

//         {/* Text section */}
//         <h1 className="text-white text-4xl font-semibold mt-4 text-center">
//           Welcome to Chef Kitchen
//         </h1>

//         <p className="text-white/70 text-md text-center max-w-xs mt-2">
//           Check out the awesome food experience! It's super fresh, quick, and oh-so tasty!
//         </p>

//         {/* Button */}
//         <button onClick={() => navigate("/menu")} className="bg-orange-400 hover:bg-orange-300 active:scale-95 transition text-white font-light py-3 px-20 rounded-lg shadow-md mt-6">
//           Explore Menu
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



import React from "react";
import FruitBg from "../assets/img.svg";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen bg-cover bg-center overflow-hidden no-scrollbar"
      style={{ backgroundImage: `url(${FruitBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-start h-full px-4 sm:px-6">
        <div className="relative w-full max-w-[500px] mt-14 sm:mt-20">

          {/* Fruit image */}
          <img
            src={FruitBg}
            alt="fruit"
            className="rounded-xl w-[85%] sm:w-[90%] max-w-[280px] sm:max-w-[320px] mx-auto"
          />

          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-28 h-28 sm:w-36 sm:h-36
              rounded-full backdrop-blur-sm
            "
          />
        </div>

        {/* Text section */}
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mt-6 text-center">
          Welcome to Chef Kitchen
        </h1>

        <p className="text-white/70 text-sm sm:text-base text-center max-w-xs sm:max-w-sm mt-3">
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
            mt-6
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
