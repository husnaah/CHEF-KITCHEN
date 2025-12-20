import { MdDelete } from "react-icons/md";

export default function OrderPanel({
  showOrderPanel,
  showMobileCart,
  setShowMobileCart,
  cart,
  orderType,
  setOrderType,
  updateNote,
  removeItem,
  total,
  placeOrder,
}) {
  return (
    <>
      {/* ================= DESKTOP ORDER PANEL ================= */}
      {showOrderPanel && (

        // <aside className="
        //     hidden lg:flex
        //     w-[420px]
        //     bg-slate-950
        //     fixed right-0 top-0 h-screen
        //     z-50  p-6
        //     ">

         <aside
         className="
         fixed top-0 right-0 z-50
         h-screen hidden lg:flex
          w-[420px] bg-slate-950
         p-6 flex-col
         "> 

        {/* DESKTOP */}
            


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
                    }`}
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

          {/* ITEMS (SCROLL ONLY HERE) */}
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
                    <p className="text-sm">
                      {(c.qty * c.price).toFixed(2)}
                    </p>
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

          {/* FOOTER */}
          <div className="pt-4 border-t border-gray-700 text-sm text-gray-400">
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
                w-full bg-orange-400 py-3 rounded-lg
                text-black font-semibold transition-all
                hover:shadow-[0_0_25px_rgba(251,146,60,0.6)]
                active:scale-95
              "
            >
              Order now
            </button>
          </div>
        </aside>
      )}

      {/* ================= MOBILE CART ================= */}
      {showMobileCart && (
        <div className="fixed inset-0 z-[80] bg-black/60 lg:hidden">
          <div
            className="
              absolute bottom-0 left-0 right-0
              md:top-0 md:right-0 md:left-auto
              md:w-[420px] md:h-screen
              bg-slate-950 rounded-t-2xl md:rounded-none
              flex flex-col p-4 max-h-[85vh]
              w-full sm:w-[380px] h-full
            "
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold">Your Order</h2>
              <button onClick={() => setShowMobileCart(false)}>✕</button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto space-y-3 text-sm">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400">Cart is empty</p>
              ) : (
                cart.map((c) => (
                  <div
                    key={`${c.id}-${c.size}`}
                    className="flex justify-between"
                  >
                    <span>
                      {c.qty} × {c.name} ({c.size})
                    </span>
                    <span>
                      {(c.qty * c.price).toFixed(2)} AED
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <button
              onClick={() => {
                placeOrder();
                setShowMobileCart(false);
              }}
              className="mt-4 bg-orange-400 py-3 rounded-lg text-black font-semibold"
            >
              Order now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
