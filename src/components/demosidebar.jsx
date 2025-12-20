import { useState } from "react";
import logoo from "../assets/shop.svg";
import { useLocation, useNavigate } from "react-router-dom";


import Home_icon from "../assets/home.svg";
import Offer_icon from "../assets/offer.svg";
import Like_icon from "../assets/love.svg";
import Male_icon from "../assets/messages.svg";
import Notify_icon from "../assets/notification.svg";
import Exit_icon from "../assets/logout.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* DATA ONLY — no JSX here */
  const items = [
      { src: Home_icon, alt: "Home", path: "/menu" },
      { src: Offer_icon, alt: "Offers", path: "/offers" },
      { src: Like_icon, alt: "Likes", path: "/likes" },
      { src: Male_icon, alt: "Profile", path: "/profile" },
      { src: Notify_icon, alt: "Notifications", path: "/notify" },
    ];

  return (
<aside className="
      fixed bottom-0 left-0 right-0 z-50
      md:sticky md:top-0 md:h-screen md:w-20
      bg-slate-950 
      flex flex-row md:flex-col
      justify-around items-center
      py-2 md:py-6
    ">     
     {/* LOGO */}
      <img src={logoo} alt="Logo" className="w-50 h-10" />

      {/* ICONS */}
      <div className="flex flex-col gap-6 py-4">
        {items.map((item, i) => {
        const isActive = location.pathname === item.path;
   return(
          <button
            key={i}
              onClick={() => navigate(item.path)}
            
            className="relative w-12 h-12 flex items-center justify-center"
          >
            {/* ACTIVE CURVE */}
            {isActive && (
              <>
                {/* top */}
                <div className="absolute top-[-50%] -right-4 w-3 h-5  bg-[#272731] " />
                <div className="absolute top-[-51%] -right-4 w-3 h-5  bg-[#171724] rounded-br-2xl" />

                {/* center */}
                <div className="absolute -right-7 w-20 h-14 bg-[#272731]  rounded-l-xl transition-all duration-300" />

                {/* bottom */}
                <div className="absolute bottom-[-50%] -right-4 w-3 h-5 bg-[#272731] " />
                <div className="absolute bottom-[-50%] -right-4 w-3 h-5 bg-[#171724] rounded-tr-2xl" />
              </>
            )}

            
           {/* ICON */}
<div
  className={`relative z-10 p-2 rounded-md transition-all duration-300
    ${
      isActive
        ? "bg-[#FF9F43] shadow-[0_0_18px_rgba(249,115,22,0.75)]"
        : "bg-transparent hover:shadow-[0_0_16px_rgba(255,159,67,0.55)]"
    }`}
>
  <img
    src={item.src}
    alt={item.alt}
    className={`w-4 h-4 transition-all duration-300
      ${
        isActive
          ? "brightness-0 invert" // WHITE
          : "brightness-0 saturate-100 invert-[62%] sepia-[55%] saturate-[1100%] hue-rotate-[5deg]" // ORANGE
      }
    `}
  />
</div>

          </button>
   );
})}
      </div>

      {/* LOGOUT */}
      <button onClick={() => navigate("/")} className="mt-auto w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5">
        <img src={Exit_icon} alt="Logout" className="w-5 h-5" />
      </button>
    </aside>
  );
};

export default Sidebar;



