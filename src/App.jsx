import React from "react";
import Menu from "./pages/Menu";

import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Offers from "./pages/Offers";
import Likes from "./pages/Likes";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

// TODO : ✅ Create new folder named "Pages and move theses page component from component folder to that page folder"
// TODO : ✅Use context here for statemanagement
// TODO : ✅By default set selected as first variant , Currently first we need to select a variant to add the product to cart
// TODO : ✅ There has an issue while we delete an item from cart the entire product is deleted , we need to reduce it's count if it is less than one remove that item

const App = () => {
  return (
    <div className="font-barlow">
      {/* <Menu/> */}
      {/* <Demo/> */}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notify" element={<Notifications />} />
      </Routes>
    </div>
  );
};

export default App;
