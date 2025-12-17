import React, { useState } from "react";
import { Trash2 } from "lucide-react";

import noodle2 from "../assets/noodle2.svg";
import noodle3 from "../assets/noodle3.svg";
import noodle4 from "../assets/noodle4.svg";
import noodle5 from "../assets/noodle5.svg";

const OrderPanel = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Spicy seasoned seafood",
      qty: 2,
      price: 25,
      amount: 2.29,
      note: "Please, just a little bit spicy only.",
      image: noodle2,
    },
    {
      id: 2,
      name: "Salted pasta with mushroom",
      qty: 1,
      price: 25,
      amount: 2.69,
      note: "",
      image: noodle3,
    },
    {
      id: 3,
      name: "Spicy instant noodle",
      qty: 3,
      price: 25,
      amount: 3.49,
      note: "",
      image: noodle4,
    },
    {
      id: 4,
      name: "Healthy noodle with spinach leaf",
      qty: 1,
      price: 25,
      amount: 3.29,
      note: "",
      image: noodle5,
    },
  ]);

  const handleNoteChange = (id, value) => {
    setOrders(
      orders.map((item) =>
        item.id === id ? { ...item, note: value } : item
      )
    );
  };

  const removeItem = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };

  const subtotal = orders.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  return (
    <div className="w-[360px] bg-[#10101B] p-6 text-white rounded-xl">
      {/* Header */}
      <h2 className="text-lg font-semibold">Orders #34562</h2>

      {/* Order type */}
      <div className="flex gap-2 mt-4 text-xs">
        <button className="bg-orange-500 px-3 py-1.5 rounded-md">
          Dine In
        </button>
        <button className="border border-orange-400 text-orange-400 px-3 py-1.5 rounded-md">
          Take away
        </button>
        <button className="border border-orange-400 text-orange-400 px-3 py-1.5 rounded-md">
          Delivery
        </button>
      </div>

      {/* Table header */}
      <div className="flex justify-between text-white text-xs mt-6 border-b border-gray-600 pb-2">
        <span>Item</span>
        <span className="pl-32">Qty</span>
        <span className="pr-14">Price</span>
      </div>

      {/* Items */}
      <div className="mt-4 space-y-6">
        {orders.map((item) => (
          <div key={item.id}>
           
            <div className="flex justify-between items-center">
              {/* Item info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">${item.amount}</p>
                </div>
              </div>

              {/* Qty + price + delete */}
              <div className="flex items-center gap-4">
                <div className="bg-[#1F1F2E] px-3 py-1 rounded text-sm">
                  {item.qty}
                </div>

                <span className="text-sm">{item.price}.00</span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="border border-orange-400 text-orange-400 p-2 rounded-lg hover:bg-orange-400 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Note */}
            <input
              type="text"
              placeholder="Order Note..."
              value={item.note}
              onChange={(e) =>
                handleNoteChange(item.id, e.target.value)
              }
              className="w-full mt-2 bg-[#1F1F2E] px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>
        ))}
      </div>

      {/* total */}
      <div className="mt-6 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Discount</span>
          <span>5%</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Sub total</span>
          <span>{(subtotal * 0.95).toFixed(2)} AED</span>
        </div>

        <button className="w-full mt-6 bg-orange-500 py-3 rounded-lg font-semibold">
          Order now
        </button>
      </div>
    </div>
  );
};

export default OrderPanel;