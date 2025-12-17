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

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [orderType, setOrderType] = useState("Dine In");
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [cart, setCart] = useState([]);

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
    { id: 1, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 },
    { id: 2, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 },
    { id: 3, name: "Spicy instant noodle with special omelette", img: Noodles3, price: 25, bowls: 17 },
    { id: 4, name: "Healthy noodle with spinach leaf", img: Noodles4, price: 25, bowls: 22 },
    { id: 5, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 },
    { id: 6, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 },
    { id: 7, name: "Spicy instant noodle with special omelette", img: Noodles3, price: 25, bowls: 17 },
    { id: 8, name: "Healthy noodle with spinach leaf", img: Noodles4, price: 25, bowls: 22 },
    { id: 9, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 },
    { id: 10, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 },
  ];

  const addToCart = (dish) => {
  const size = selectedSize[dish.id];
      if (!size) {
        alert("Please select size (S / M / L)");
        return;
      }
      setCart((prev) => {
        return [
          ...prev,
          { ...dish, size, qty: 1, note: "" }
        ];
      });
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

  const filteredDishes = dishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const placeOrder = () => {
    if (!cart.length) return alert("Cart is empty");

    setReceiptData({
      id: Math.floor(Math.random() * 90000) + 10000,
      orderType,
      items: cart,
      subtotal,
      discount,
      total,
      date: new Date().toLocaleString(),
    });

    setShowReceipt(true);
    setShowOrderPanel(false);
    setCart([]);
  };
  return (
    
    
<div className="min-h-screen bg-[#272731]  text-gray-200  flex ">
      <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
  <div className="flex flex-1 gap-4">
      <main className="flex-1 bg-[#272731] rounded-full p-6 relative ">

  {/* 🔒 STICKY HEADER BLOCK */}
    <div className="sticky top-0 z-40 bg-[#272731] pb-4">

    {/* TOP BAR */}
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Chef Kitchen</h1>
        <p className="text-s text-gray-400">
          {today.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative hidden sm:block">
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
            onClick={() => setShowOrderPanel(prev => !prev)}
            className="
              relative p-3 rounded-xl bg-orange-400
              transition-opacity duration-200

              hover:opacity-80
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

   <div className="flex gap-6 mt-6  border-b border-gray-700 overflow-x-auto whitespace-nowrap">
  {["Today Special", "Our Specials", "South Indian Special"].map((t, i) => (
    <button
      key={i}
      onClick={() => setActiveTab(i)}
      className={`relative pb-3 text-sm
        ${
          activeTab === i
            ? `
              text-orange-400
              after:content-['']
              after:absolute
              after:left-0
              after:bottom-0
              after:h-[2px]
              after:w-[40px]
              after:bg-orange-400
            `
            : "text-gray-400 hover:text-gray-300"
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
        className="bg-[#23232b] px-3 py-1 rounded"
      >
        <option>Dine In</option>
        <option>Take away</option>
        <option>Delivery</option>
      </select>
    </div>

  </div>

  {/* 🔽 SCROLLING CONTENT STARTS HERE */}
  {/* dishes list, cards, etc */}




                    {/* DISH GRID */}
                    <div className={`grid gap-10 my-20   transition-all duration-300
    grid-cols-2
    ${showOrderPanel ? "lg:grid-cols-3" : "lg:grid-cols-5"}
  `}>
                      {filteredDishes.map((d) => (
                        <div
                          key={d.id}
                          className="relative bg-[#1d1c27] pt-20 pb-6 px-4 rounded-2xl text-center
                                    flex flex-col h-full"
                        >
                          {/* IMAGE */}
                          <img
                            src={d.img}
                            className="w-24 h-24 rounded-full absolute -top-10 left-1/2 -translate-x-1/2"
                          />

                          {/* CONTENT */}
                          <div className="flex-1 flex flex-col">
                            {/* NAME (FIX HEIGHT) */}
                            <p className="text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
                              {d.name}
                            </p>

                            {/* PRICE */}
                            <p className="text-xs text-green-400 mt-1">
                              {d.price} AED
                            </p>

                            {/* STOCK */}
                            <p className="text-xs text-gray-400">
                              {d.bowls} Bowls available
                            </p>

                            {/* SIZE */}
                            <div className="flex justify-center gap-2 mt-2">
                              {["S", "M", "L"].map((s) => (
                                <button
                                  key={s}
                                  onClick={() =>
                                    setSelectedSize((p) => ({ ...p, [d.id]: s }))
                                  }
                                  className={`px-2 py-0.5 text-xs rounded ${
                                    selectedSize[d.id] === s
                                      ? "bg-orange-400 text-black"
                                      : "bg-[#16161d] text-gray-400"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* ADD BUTTON (ALWAYS AT BOTTOM) */}
                          <button
                            onClick={() => addToCart(d)}
                            className="mt-4 w-full bg-orange-400 text-black text-sm py-2 rounded-lg font-semibold hover:opacity-90"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
</main>
</div>

{/* order panel here */}
{showOrderPanel && (
  <aside className="
    hidden lg:flex
    w-[380px]
    bg-[#1f1d2b]
    rounded-2xl
    p-6
    flex-col
    sticky top-6
    h-[calc(100vh-3rem)]
  ">



    {/* HEADER */}
    <div className="mb-4">
          <h2 className="text-sm font-semibold mb-3">Orders #34562</h2>
          <div className="flex gap-2">
              {["Dine In", "Take away", "Delivery"].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`px-4 py-1 rounded-md text-xs transition
                    ${
                      orderType === type
                        ? "bg-orange-400 text-black"
                        : "border border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-400"
                    }
                  `}
                >
          {type}
        </button>
      ))}
    </div>


      <div className="flex justify-between text-xs text-gray-400 mt-4">
        <span>Item</span>
        <span>Qty</span>
        <span>Price</span>
      </div>
    </div>

    {/* ITEMS – ONLY THIS SCROLLS */}
<div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
      {cart.map((c) => (
        <div key={`${c.id}-${c.size}`} className="space-y-2">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={c.img}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="text-sm line-clamp-1">{c.name}</p>
                <p className="text-xs text-gray-400">{c.price} AED</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#2d2d39] px-3 py-1 rounded-md text-sm">
                {c.qty}
              </div>

              <p className="text-sm">{(c.qty * c.price).toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={c.note}
              onChange={(e) =>
                updateNote(c.id, c.size, e.target.value)
              }
              placeholder="Order Note..."
              className="flex-1 bg-[#2d2d39] px-3 py-2 text-xs rounded-md outline-none"
            />

            <button
              onClick={() => removeItem(c.id, c.size)}
              className="w-9 h-9 rounded-md border border-orange-400 text-orange-400 flex items-center justify-center"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* FOOTER – FIXED */}
    <div className="pt-4 border-t sticky border-gray-700 text-sm text-gray-400">
      <div className="flex justify-between mb-2">
        <span>Discount</span>
        <span>5%</span>
      </div>

      <div className="flex justify-between text-white font-semibold mb-4">
        <span>Sub total</span>
        <span>{total.toFixed(2)} AED</span>
      </div>

      <button
  onClick={placeOrder}
  className="
    w-full bg-orange-400 py-3 rounded-lg text-black font-semibold
    transition-all duration-200

    hover:shadow-[0_0_25px_rgba(251,146,60,0.6)]
    hover:-translate-y-[1px]

    active:scale-95
    active:shadow-[0_0_30px_rgba(251,146,60,0.9)]
    shadow-[0_0_0_rgba(0,0,0,0)]
  "
>
  Order now
</button>


    </div>

  </aside>
)}




{/* COMPACT RECEIPT MODAL */}
{showReceipt && receiptData && (
  <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
    <div className="bg-[#1f1d29] w-full max-w-sm rounded-xl p-4 text-gray-200">

      {/* HEADER */}
      <div className="text-center mb-3">
        <h2 className="text-sm font-semibold">Order Receipt</h2>
        <p className="text-[10px] text-gray-400">
          #{receiptData.id} • {receiptData.date}
        </p>
      </div>

      {/* ITEMS */}
      <div className="space-y-1 text-xs mb-3">
        {receiptData.items.map((i, idx) => (
          <div key={idx} className="flex justify-between">
            <span className="truncate max-w-[70%]">
              {i.qty} × {i.name}
            </span>
            <span>{(i.price * i.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t border-gray-700 pt-2 text-xs space-y-1">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span>{receiptData.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Discount</span>
          <span>-5%</span>
        </div>
        <div className="flex justify-between font-semibold text-white">
          <span>Total</span>
          <span>{receiptData.total.toFixed(2)} AED</span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => setShowReceipt(false)}
        className="w-full mt-3 bg-orange-400 py-2 rounded-md text-black text-sm font-semibold"
      >
        Done
      </button>
    </div>
  </div>
)}


    </div>
  );
}
