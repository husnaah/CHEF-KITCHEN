import React, { useState } from "react";

// images
import Noodles1 from "../assets/noodle1.svg";
import Noodles2 from "../assets/noodle2.svg";
import Noodles3 from "../assets/noodle3.svg";
import Noodles4 from "../assets/noodle4.svg";
import Noodles5 from "../assets/noodle5.svg";
import Noodles6 from "../assets/noodle6.svg";

// icons
import { AiFillShop, AiOutlineSearch } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { BiSolidOffer, BiMessageSquareCheck } from "react-icons/bi";
import { RiHeart2Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [orderType, setOrderType] = useState("Dine In");
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [cart, setCart] = useState([]);

  // RECEIPT STATE
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const dishes = [
    { id: 1, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 },
    { id: 2, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 },
    { id: 3, name: "Spicy instant noodle with special omelette", img: Noodles3, price: 25, bowls: 17 },
    { id: 4, name: "Healthy noodle with spinach leaf", img: Noodles4, price: 25, bowls: 22 },
    { id: 5, name: "Hot spicy fried rice with omelet", img: Noodles5, price: 25, bowls: 13 },
    { id: 6, name: "Spicy instant noodle with special omelette", img: Noodles6, price: 25, bowls: 17 },
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
    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

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
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] text-gray-200 p-3 md:p-6 flex flex-col md:flex-row gap-4">

      {/* SIDEBAR */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 md:static md:w-20 bg-[#1a1823] flex flex-row md:flex-col justify-around items-center py-2 md:py-6">
        <div className="hidden md:grid size-10 rounded-xl bg-orange-400 text-black place-items-center">
          <AiFillShop />
        </div>

        {[GoHome, BiSolidOffer, RiHeart2Line, BiMessageSquareCheck, IoNotificationsOutline].map(
          (Icon, i) => (
            <button
              key={i}
              onClick={() => setActiveMenu(i)}
              className={`p-2 rounded-xl text-xl ${
                activeMenu === i ? "bg-orange-400/20 text-orange-400" : "text-gray-400"
              }`}
            >
              <Icon />
            </button>
          )
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-[#16161d] rounded-xl p-4 md:p-6 pb-24 md:pb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Chef Kitchen</h1>
            <p className="text-xs text-gray-400">Tuesday, 2 March 2024</p>
          </div>

          <div className="relative w-72">
            <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for food..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1f1d29]"
            />
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


        {/* DISH GRID (FIXED) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mt-20 ">
          {filteredDishes.map((d) => (
            <div
              key={d.id}
              onClick={() => addToCart(d)}
              className="relative bg-[#1d1c27] pt-20 pb-6 px-4 rounded-2xl text-center cursor-pointer"
            >
              <img
                src={d.img}
                alt=""
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2"
              />

              <p className="text-sm line-clamp-2 min-h-[2.5rem]">{d.name}</p>

              {d.oldPrice && (
                <p className="text-xs text-red-500 line-through">
                  {d.oldPrice} AED
                </p>
              )}
              <p className="text-xs text-green-400">{d.price} AED</p>

              <p className="text-xs text-gray-400 mt-1">
                {d.bowls} Bowls available
              </p>

              <div className="flex justify-center gap-2 mt-2">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize((p) => ({ ...p, [d.id]: s }));
                    }}
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
          ))}
        </div>
      </main>

       {/* ORDER PANEL */}
            <aside className="hidden lg:block w-96 bg-[#1f1d29] rounded-xl p-6">
              <h2 className="text-sm mb-4">Orders #34562</h2>
            
              {/* ORDER TYPE */}
              <div className="flex gap-2 mb-4">
                {["Dine In", "Take away", "Delivery"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      orderType === t
                        ? "bg-orange-400 text-black"
                        : "bg-[#2c2935] text-orange-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            
              {/* TABLE HEADER */}
              <div className="grid grid-cols-[1fr_50px_60px] text-xs text-gray-400 mb-2">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Price</span>
              </div>
            
              {/* ITEMS */}
              <div className="space-y-6 max-h-[55vh] overflow-y-auto mt-4">
                {cart.map((c) => (
                  <div key={`${c.id}-${c.size}`} className="bg-[#17161b] p-3 rounded-xl">
                    <div className="grid grid-cols-[1fr_50px_60px] gap-2 items-center">
                      {/* ITEM */}
                      <div className="flex gap-3">
                        <img src={c.img} className="w-9 h-9 rounded-full" />
                        <div>
                          <p className="text-sm leading-tight line-clamp-1">
                            {c.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ${c.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
            
                      {/* QTY */}
                      <div className="flex items-center gap-4">
                        <div className="bg-[#23232b] px-3 py-1 rounded text-sm">
                          {c.qty}
                        </div>
                      </div>
            
                      {/* PRICE + DELETE */}
                      <div className="flex justify-end gap-2 items-center">
                        <span className="text-sm">
                          {(c.price * c.qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(c.id, c.size)}
                          className="border border-orange-400 text-orange-400 p-2 rounded-lg hover:bg-orange-400 hover:text-white"
                        >
                          <MdDelete className="text-orange-400" />
                        </button>
                      </div>
                    </div>
            
                    {/* NOTE */}
                    <input
                      value={c.note}
                      onChange={(e) =>
                        updateNote(c.id, c.size, e.target.value)
                      }
                      placeholder="Order Note..."
                      className="mt-2 w-full bg-[#23232b] px-3 py-2 text-xs rounded-md text-gray-300"
                    />
                  </div>
                ))}
              </div>
            
              {/* TOTAL */}
              <div className="mt-6 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>5%</span>
                </div>
                <div className="flex justify-between mt-2 text-white font-semibold">
                  <span>Sub total</span>
                  <span>{total.toFixed(2)} AED</span>
                </div>
              </div>
            
              {/* ORDER BUTTON */}
              <button
                onClick={placeOrder}
                className="w-full mt-4 bg-orange-400 py-3 rounded-lg text-black font-semibold"
              >
                Order now
              </button>
            </aside>


            
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
