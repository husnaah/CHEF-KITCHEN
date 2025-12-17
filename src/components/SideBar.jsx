import React from 'react'
import { AiFillShop } from 'react-icons/ai'
import { GoHome } from "react-icons/go";
import { BiSolidOffer, BiMessageSquareCheck } from "react-icons/bi";
import { RiHeart2Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import SideBarButtons from './SideBarButtons';

const SideBar = ({ activeMenu, setActiveMenu }) => {
  return (
    <aside className="
      fixed bottom-0 left-0 right-0 z-50
      md:sticky md:top-0 md:h-screen md:w-20
      bg-[#1a1823]
      flex flex-row md:flex-col
      justify-around items-center
      py-2 md:py-6
    ">
      <div className="hidden md:grid size-10 rounded-xl bg-orange-400 text-black place-items-center">
        <AiFillShop />
      </div>

      {[GoHome, BiSolidOffer, RiHeart2Line, BiMessageSquareCheck, IoNotificationsOutline].map(
        (Icon, i) => (
          <SideBarButtons
            key={i}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            i={i}
            Icon={Icon}
            path="/home"
          />
        )
      )}
    </aside>
  )
}

export default SideBar
