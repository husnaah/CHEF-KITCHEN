import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarButtons = ({setActiveMenu,activeMenu,i,Icon,path}) => {
    const navigate = useNavigate()
    const handleNavigate = ()=> {
        setActiveMenu(i)
        if(path){

            navigate(`/${path}`)
        }
    }
  return (
    <button
      onClick={() =>handleNavigate() }
      className={`p-2 rounded-xl text-xl ${
        activeMenu === i ? "bg-orange-400/20 text-orange-400" : "text-gray-400"
      }`}
    >
      <Icon />
    </button>
  );
};

export default SideBarButtons;
