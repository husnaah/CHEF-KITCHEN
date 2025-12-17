import React, { useState } from "react";

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
    const size = selectedSize[dish.id] || "M";
    setCart((prev) => {
      const found = prev.find((i) => i.id === dish.id && i.size === size);
      if (found) {
        return prev.map((i) =>
          i.id === dish.id && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...dish, size, qty: 1, note: "" }];
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
    <div className="min-h-screen bg-[#0d0d12] text-gray-200 p-3 md:p-6 flex gap-4">

      <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* MAIN */}
      <main className="flex-1 bg-[#16161d] rounded-xl p-6 relative">
        {/* STICKY HEADER */}
<div className="sticky top-0 z-40 bg-[#16161d] pb-4">

  {/* TOP BAR */}
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-xl font-semibold">Chef Kitchen</h1>
      <p className="text-xs text-gray-400">Tuesday, 2 March 2024</p>
    </div>

    <div className="flex gap-3">
      <div className="relative hidden sm:block">
        <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food..."
          className="pl-9 pr-4 py-2 rounded-xl bg-[#1f1d29]"
        />
      </div>

      {/* CART BUTTON */}
      <button
        onClick={() => setShowOrderPanel(true)}
        className="relative bg-[#1f1d29] p-3 rounded-xl hover:bg-orange-400"
      >
        <FiShoppingCart className="text-xl" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-400 text-black text-xs w-5 h-5 rounded-full grid place-items-center">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  </div>

  {/* TABS */}
  <div className="flex gap-6 mt-6 border-b border-gray-700 pb-2 overflow-x-auto whitespace-nowrap">
    {["Today Special", "Our Specials", "South Indian Special"].map((t, i) => (
      <button
        key={i}
        onClick={() => setActiveTab(i)}
        className={
          activeTab === i
            ? "text-orange-400 border-b-2 border-orange-400 pb-1"
            : "text-gray-400"
        }
      >
        {t}
      </button>
    ))}
  </div>

</div>


      {/* CHOOSE DISHES */}
        <div className="flex justify-between items-center mt-6">
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





                    {/* DISH GRID */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mt-20">
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

      {/* ORDER PANEL */}
      {showOrderPanel && (
        <aside className="fixed top-0 right-0 z-[80] h-full w-full sm:w-[420px] bg-[#1f1d29] p-6 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h2 className="text-sm">Orders</h2>
            <button onClick={() => setShowOrderPanel(false)}>✕</button>
          </div>

          {cart.map((c) => (
            <div key={`${c.id}-${c.size}`} className="bg-[#17161b] p-3 rounded-xl mb-4">
              <div className="flex justify-between">
                <p>{c.name}</p>
                <button onClick={() => removeItem(c.id, c.size)}>
                  <MdDelete />
                </button>
              </div>
              <p className="text-xs">{c.qty} × {c.price} AED</p>
              <input
                value={c.note}
                onChange={(e) => updateNote(c.id, c.size, e.target.value)}
                placeholder="Order note..."
                className="w-full mt-2 bg-[#23232b] px-2 py-1 rounded text-xs"
              />
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <span>Total</span>
            <span>{total.toFixed(2)} AED</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-4 bg-orange-400 py-3 rounded-lg text-black font-semibold"
          >
            Order now
          </button>
        </aside>
      )}
    </div>
  );
}
