import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

import { FiShoppingCart } from "react-icons/fi";


import { dishes } from "../constants/dishes";
import { tabCategoryMap, tabLabels } from "../constants/tabs";

import MenuHeader from "../components/MenuHeader";
import MenuTabs from "../components/MenuTabs";


// icons
import SideBar from "../components/SideBar";
import OrderPanel from "../components/Orderpanel";
import DishGrid from "../components/DishGrid";
import ReceiptModal from "../components/Reciept";

// TODO :✅ Create a sperate folder under the src named "CONSTANTS" and move all the constants to that folder [eg :dishes,tabCategoryMap]
// TODO :✅Split this component into smaller components and move them , To make the code more clean

export default function Menu() {
    const {
    cart,
    orderType,
    setOrderType,
    addToCart,
    decreaseQty,
    removeItemCompletely,
    updateNote,
    subtotal,
    discount,
    total,
  } = useCart();

  //(LOCAL UI STATE)
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  

  //item added alert
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success"); // success | error

  // NEW STATE
  const [showOrderPanel, setShowOrderPanel] = useState(false);

  //DATE & DAY
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    // update once per day (midnight safe enough for UI)
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000); // every minute
    return () => clearInterval(interval);
  }, []);

  // MOBILE CART
  const [showMobileCart, setShowMobileCart] = useState(false);

  // RECEIPT
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);


    //Initialize selectedSize automatically
    useEffect(() => {
      const defaultSizes = {};
      dishes.forEach((dish) => {
        defaultSizes[dish.id] = "S"; // default size
      });
      setSelectedSize(defaultSizes);
    }, []);



  const handleAddToCart = (dish) => {
  const size = selectedSize[dish.id];

  addToCart(dish, size);

  setToastType("success");
  setToast(`"${dish.name}" (${size}) added`);
  setTimeout(() => setToast(""), 2000);
};


 
  //fiter dish items
  const filteredDishes = dishes.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());

    const selectedCategory = tabCategoryMap[activeTab];

    const matchesTab =
      selectedCategory === "all" || d.category === selectedCategory;

    const matchesOrderType = d.availableFor.includes(orderType);

    return matchesSearch && matchesTab && matchesOrderType;
  });

  //placeorder reciept
  const placeOrder = () => {
    if (!cart.length) return alert("Cart is empty");

    setReceiptData({
      id: Math.floor(Math.random() * 90000) + 10000,
      orderType, // ✅ already here
      items: cart, // ✅ notes already inside items
      subtotal,
      discount,
      total,
      date: new Date().toLocaleString(),
    });

    setShowReceipt(true);
    setShowOrderPanel(false);
  };

  const isInCart = (dishId) => {
    const size = selectedSize[dishId];
    if (!size) return false;

    return cart.some((c) => c.id === dishId && c.size === size);
  };

  return (
    <div
      className={`min-h-screen bg-[#272731]   text-gray-200  flex transition-all duration-300 ${
        showOrderPanel ? "lg:mr-[400px]" : "mr-0"
      }`}
    >
      <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex flex-1 gap-4 overflow-hidden">
        <main className="flex-1 bg-[#272731]  px-6 pb-6 pt-0 relative h-screen overflow-y-auto no-scrollbar">
          {/* 🔒 STICKY HEADER BLOCK */}
          <div className="sticky top-0 z-40 bg-[#272731]  pb-4">
              <MenuHeader
                search={search}
                setSearch={setSearch}
                cartCount={cart.length}
                onCartClick={() => setShowOrderPanel((p) => !p)}
                today={today}
              />

              <MenuTabs
                tabs={tabLabels}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />


            {/* ✅ CHOOSE DISHES (NOW STICKY) */}
            <div className="flex justify-between items-center mt-4 pt-4  pb-3">
              <h2 className="font-semibold">Choose Dishes</h2>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="bg-[#23232b] pl-2 pr-4 py-2.5  text-gray-200 text-sm   rounded-lg border border-white/15 outline-none"
              >
                <option>All</option>
                <option>Dine In</option>
                <option>Take away</option>
                <option>Delivery</option>
              </select>
            </div>
          </div>

          {/* 🔽 SCROLLING CONTENT STARTS HERE */}
          {/* dishes list, cards, etc */}

          {/* DISH GRID */}
          <DishGrid
            filteredDishes={filteredDishes}
            showOrderPanel={showOrderPanel}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            addToCart={handleAddToCart}
            isInCart={isInCart}
            cart={cart}
          />
        </main>
      </div>

      <OrderPanel
        showOrderPanel={showOrderPanel}
        showMobileCart={showMobileCart}
        setShowMobileCart={setShowMobileCart}
        cart={cart}
        orderType={orderType}
        setOrderType={setOrderType}
        updateNote={updateNote}
        decreaseQty={decreaseQty}
        removeItemCompletely={removeItemCompletely}
        total={total}
        placeOrder={placeOrder}
      />

      {/* COMPACT RECEIPT MODAL */}
      <ReceiptModal
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        receiptData={receiptData}
      />

      {/* 🛒 MOBILE / TABLET CART BUTTON */}

      {!showMobileCart && !showReceipt && (
        <button
          onClick={() => setShowMobileCart(true)}
          className="
                  fixed
                  bottom-5
                  right-5
                  z-[120]

                  flex lg:hidden
                  items-center justify-center

                  bg-[#FE9232]
                  text-black

                  w-14 h-14
                  rounded-full
                  shadow-xl

                  hover:opacity-90
                  active:scale-95
                  transition
                "
        >
          <FiShoppingCart className="text-xl" />

          {cart.length > 0 && (
            <span
              className="
                    absolute -top-1 -right-1
                    bg-black text-orange-400
                    text-xs
                    w-5 h-5
                    rounded-full
                    grid place-items-center
                  "
            >
              {cart.length}
            </span>
          )}
        </button>
      )}

      {toast && (
        <div
          className={`
      fixed top-4 left-1/2 -translate-x-1/2
      z-[200]
      px-5 py-3 rounded-lg text-sm text-white
      shadow-lg transition-all
      ${toastType === "error" ? "bg-red-600" : "bg-green-600"}
    `}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
