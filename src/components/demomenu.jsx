import React, { useState, useEffect } from "react";

// images
import Noodles1 from "../assets/noodle1.svg";
import Noodles2 from "../assets/noodle2.svg";
import Noodles3 from "../assets/noodle3.svg";
import Noodles4 from "../assets/noodle4.svg";
import Noodles5 from "../assets/noodle5.svg";
import Noodles6 from "../assets/noodle6.svg";

// icons
import { AiOutlineSearch } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import SideBar from "./SideBar";
import OrderPanel from "./Orderpanel";
import DishGrid from "./DishGrid";
import ReceiptModal from "./Reciept";

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [orderType, setOrderType] = useState("Dine In");
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [cart, setCart] = useState([]);

  //filtering
  const tabCategoryMap = ["all", "today", "our", "south"];

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

  const dishes = [
    {
      id: 1,
      name: "Healthy noodle with spinach leaf",
      img: Noodles1,
      price: 25,
      bowls: 22,
      category: "today",
      availableFor: ["Dine In", "Take away","All"],
    },
    {
      id: 2,
      name: "Hot spicy fried rice with omelet",
      img: Noodles2,
      price: 25,
      bowls: 13,
      category: "today",
      availableFor: ["Delivery", "Dine In","All"],
    },
    {
      id: 3,
      name: "Spicy instant noodle with special omelette",
      img: Noodles3,
      price: 25,
      bowls: 17,
      category: "our",
      availableFor: ["Dine In","All"],
    },
    {
      id: 4,
      name: "Healthy noodle with spinach leaf",
      img: Noodles4,
      price: 25,
      bowls: 22,
      category: "our",
      availableFor: ["Take away","All"],
    },
    {
      id: 5,
      name: "Healthy noodle with spinach leaf",
      img: Noodles1,
      price: 25,
      bowls: 22,
      category: "south",
      availableFor: ["Dine In","All"],
    },
    {
      id: 6,
      name: "Hot spicy fried rice with omelet",
      img: Noodles2,
      price: 25,
      bowls: 13,
      category: "south",
      availableFor: ["Delivery", "Dine In","All"],
    },
    {
      id: 7,
      name: "Spicy instant noodle with special omelette",
      img: Noodles3,
      price: 25,
      bowls: 17,
      category: "our",
      availableFor: ["Dine In","All"],
    },
    {
      id: 8,
      name: "Healthy noodle with spinach leaf",
      img: Noodles4,
      price: 25,
      bowls: 22,
      category: "today",
      availableFor: ["Take away","All"],
    },
    {
      id: 9,
      name: "Healthy noodle with spinach leaf",
      img: Noodles1,
      price: 25,
      bowls: 22,
      category: "south",
      availableFor: ["Dine In","All"],
    },
    {
      id: 10,
      name: "Hot spicy fried rice with omelet",
      img: Noodles2,
      price: 25,
      bowls: 13,
      category: "our",
      availableFor: ["Take away", "Dine In","All"],
    },
  ];

  const addToCart = (dish) => {
    const size = selectedSize[dish.id];
    if (!size) {
      setToastType("error");
      setToast("Please select size (S / M / L)");

      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => setToast(""), 2000);
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === dish.id && item.size === size
      );

      // ✅ IF EXISTS → INCREASE QTY
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1,
        };
        return updated;
      }

      // ✅ ELSE → ADD NEW ITEM
      return [...prev, { ...dish, size, qty: 1, note: "" }];
    });

    // TOAST
    setToastType("success");
    setToast(`"${dish.name}" (${size}) added successfully`);
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => setToast(""), 2000);
  };

  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateNote = (id, size, note) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, note } : i))
    );
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

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
    setCart([]);
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
            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row sm:justify-between  sm:items-center gap-4 pt-10">
              <div>
                <h1 className="text-2xl font-semibold text-white mb-2">
                  Chef Kitchen
                </h1>
                <p className="text-s text-gray-400 font-light">
                  {today.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative flex-1 lg:block">
                  <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 text-lg" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for food,coffee,etc.."
                    className="w-full pl-12 pr-4 py-3
                  rounded-xl
                  bg-[#2b2f3a]
                  text-sm text-gray-200 placeholder-gray-400

                  border border-white/10
                  focus:border-orange-400/60

                  outline-none
                  transition-all duration-200
                "
                  />
                </div>

                {/* CART BUTTON  */}
                <button
                   onClick={() => setShowOrderPanel((prev) => !prev)}
                    
                  className=" hidden lg:flex
              relative p-3 rounded-xl bg-[#FE9232]
}
              transition-opacity duration-200

              hover:opacity-70
              active:opacity-100
            "
                >
                  <FiShoppingCart className="text-xl" />

                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-orange-400 text-xs w-5 h-5 rounded-full grid place-items-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-6 mt-8 border-b border-gray-700 overflow-x-auto whitespace-nowrap no-scrollbar">
              {[
                "All",
                "Today Special",
                "Our Specials",
                "South Indian Special",
              ].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`
        relative pb-3 text-sm inline-block
        ${
          activeTab === i
            ? `
              text-orange-400
              after:content-['']
              after:absolute
              after:left-0
              after:bottom-0
              after:h-[2px]
              after:w-full
              after:bg-orange-400
            `
            : "text-white hover:text-orange-300"
        }
      `}
                >
                  {t}
                </button>
              ))}
            </div>

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
  addToCart={addToCart}
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
        removeItem={removeItem}
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
                  <span className="
                    absolute -top-1 -right-1
                    bg-black text-orange-400
                    text-xs
                    w-5 h-5
                    rounded-full
                    grid place-items-center
                  ">
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
