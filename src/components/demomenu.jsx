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
    { id: 1, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 ,category: "today" , availableFor:["Dine In", "Take away"]},
    { id: 2, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 ,category: "today", availableFor: ["Delivery","Dine In"]},
    { id: 3, name: "Spicy instant noodle with special omelette", img: Noodles3, price: 25, bowls: 17, category: "our",availableFor:["Dine In"] },
    { id: 4, name: "Healthy noodle with spinach leaf", img: Noodles4, price: 25, bowls: 22, category: "our", availableFor: ["Take away"] },
    { id: 5, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22 , category: "south", availableFor:["Dine In"]},
    { id: 6, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 , category: "south", availableFor:["Delivery","Dine In"]},
    { id: 7, name: "Spicy instant noodle with special omelette", img: Noodles3, price: 25, bowls: 17, category: "our",availableFor:["Dine In"]},
    { id: 8, name: "Healthy noodle with spinach leaf", img: Noodles4, price: 25, bowls: 22,category: "today", availableFor:["Take away"] },
    { id: 9, name: "Healthy noodle with spinach leaf", img: Noodles1, price: 25, bowls: 22, category: "south", availableFor:["Dine In"] },
    { id: 10, name: "Hot spicy fried rice with omelet", img: Noodles2, price: 25, bowls: 13 , category: "our", availableFor:["Take away","Dine In"]},
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
  const matchesSearch = d.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const selectedCategory = tabCategoryMap[activeTab];

  const matchesTab =
    selectedCategory === "all" || d.category === selectedCategory;

  const matchesOrderType =
    d.availableFor.includes(orderType);

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

  return cart.some(
    (c) => c.id === dishId && c.size === size
  );
};


  return (
    
    
<div className={`min-h-screen bg-[#272731]  text-gray-200  flex transition-all duration-300 ${showOrderPanel ? "mr-[420px]" :"mr-0"}`} >
      <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
  <div className="flex flex-1 gap-4">
      <main className="flex-1 bg-[#272731]  px-6 pb-6 pt-0 relative h-screen overflow-y-auto no-scrollbar">



  {/* 🔒 STICKY HEADER BLOCK */}
    <div className="sticky top-0 z-40 bg-[#272731] pb-4">

    {/* TOP BAR */}
    <div className="flex justify-between  items-center pt-10">
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">Chef Kitchen</h1>
        <p className="text-s text-gray-400 font-light">
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

  <div className="flex gap-6 mt-8 border-b border-gray-700 overflow-x-auto whitespace-nowrap">
  {["All", "Today Special", "Our Specials", "South Indian Special"].map((t, i) => (
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
        className="bg-[#23232b] pl-2 pr-4 py-2.5  text-gray-200 text-sm   rounded-lg border border-white/15 outline-none">
        <option>Dine In</option>
        <option>Take away</option>
        <option>Delivery</option>
      </select>
    </div>

  </div>

  {/* 🔽 SCROLLING CONTENT STARTS HERE */}
  {/* dishes list, cards, etc */}




                    {/* DISH GRID */}
                   <div className="mt-10 pb-28">

              {/* take away , south indian special empty */}
              {filteredDishes.length === 0 ? (
                // ✅ EMPTY STATE
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <p className="text-lg font-semibold text-gray-300">
                    No matching items found
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try changing category or order type
                  </p>
                </div>
              ) : (


    // ✅ DISH GRID
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 ${
        showOrderPanel ? "md:grid-cols-3" : "md:grid-cols-4"
      } gap-9 gap-y-[60px]`}
    >
      {filteredDishes.map((d) => (
        <div
          key={d.id}
          className="relative bg-slate-950 pt-20 pb-6  rounded-2xl text-center
                     flex flex-col h-full"
        >
          {/* IMAGE */}
          <img
            src={d.img}
            className="w-[130px] h-[130px] rounded-full absolute -top-7 left-1/2 -translate-x-1/2"
          />

          {/* CONTENT */}
          <div className="flex-1 flex flex-col">
            <p
                className="
                  text-[16px]
                  font-normal
                  text-gray-100
                  leading-[1.25rem]
                  mt-8
                  px-16
                  line-clamp-2
                  min-h-[2.6rem]
                "
              >
                {d.name}
              </p>


              <div className="flex justify-center items-center gap-2 my-2">
                {/* OLD PRICE */}
                <span className="text-sm text-red-500 line-through font-light">
                  {d.price} AED
                </span>

                {/* NEW PRICE */}
                <span className="text-sm text-green-400 font-light">
                  {d.price} AED
                </span>
              </div>


            <p className="text-m text-gray-500">
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
                  className={`px-2 py-0.5 text-m rounded ${
                    selectedSize[d.id] === s
                      ? "bg-orange-400 text-black"
                      : " bg-slate-950  text-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => addToCart(d)}
            className={`mt-4   mx-10 text-sm py-2 rounded-lg font-semibold transition-all
              ${
                isInCart(d.id)
                  ? "bg-green-500 text-black"
                  : "bg-[#FE9232] text-black hover:opacity-90"
              }
            `}
          >
            {isInCart(d.id)
              ? `✓ Added (${cart.find(
                  (c) => c.id === d.id && c.size === selectedSize[d.id]
                )?.qty || 1})`
              : "+ Add"}
          </button>
        </div>
      ))}
    </div>
  )}
</div>

</main>
</div>

{/* order panel here */}
{showOrderPanel && (
  <aside className=" 
  fixed top-0 right-0 z-50
  h-screen
    hidden lg:flex
    w-[420px]
     bg-slate-950 
    p-6
    flex-col
    
    
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
    <div className="bg-[#1f1d29] w-full max-w-sm rounded-2xl text-gray-200
  max-h-[90vh] flex flex-col
">


      {/* HEADER */}
      <div className="text-center mb-4 p-5 pb-0">
        <h2 className="text-base font-semibold">Order Receipt</h2>
        <p className="text-[11px] text-gray-400 mt-1">
          #{receiptData.id} • {receiptData.date}
        </p>

        {/* ORDER TYPE */}
        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-orange-400 text-black font-medium">
          {receiptData.orderType}
        </span>
      </div>

          <div className="flex-1 overflow-y-auto px-5 mt-3 no-scrollbar">
              {/* ITEMS */}
              <div className="space-y-2 text-xs mb-4">
                {receiptData.items.map((i, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="truncate max-w-[70%]">
                        {i.qty} × {i.name} ({i.size})
                      </span>
                      <span>{(i.price * i.qty).toFixed(2)}</span>
                    </div>

                    {/* NOTE (IF EXISTS) */}
                    {i.note && (
                      <p className="text-[11px] text-gray-400 italic pl-2">
                        📝 {i.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-700 pt-3 text-xs space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{receiptData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Discount</span>
                  <span>-5%</span>
                </div>
                <div className="flex justify-between font-semibold text-white text-sm">
                  <span>Total</span>
                  <span>{receiptData.total.toFixed(2)} AED</span>
                </div>
              </div>
        </div>


      {/* THANK YOU */}
      <div className="p-5 border-t border-gray-700 bg-[#1f1d29]">
        <p className="text-center text-xs text-gray-400 mb-3">
          🙏 Thank you for ordering with <span className="text-orange-400">Chef Kitchen</span>
        </p>

        <button
          onClick={() => setShowReceipt(false)}
          className="w-full bg-orange-400 py-2.5 rounded-lg text-black text-sm font-semibold"
        >
          Done
        </button>
      </div>


    </div>
  </div>
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
