export default function DishGrid({
  filteredDishes,
  showOrderPanel,
  selectedSize,
  setSelectedSize,
  addToCart,
  isInCart,
  cart,
}) {
  return (
    <div className="mt-10 pb-28">
      {/* EMPTY STATE */}
      {filteredDishes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <p className="text-lg font-semibold text-gray-300">
            No matching items found
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Try changing category or order type
          </p>
        </div>
      ) : (
        /* DISH GRID */
        // <div
        //   className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
        //     showOrderPanel ? "md:grid-cols-2" : "lg:grid-cols-3 " 
        //   } gap-4 gap-y-[50px]`}
        // >

        <div
            className={`grid grid-cols-2  md:grid-cols-3 ${
              showOrderPanel
                ? "lg:grid-cols-3 xl:grid-cols-4"
                : "lg:grid-cols-4 xl:grid-cols-5"
            } gap-4 gap-y-[50px]`}
          >



          {filteredDishes.map((d) => (
            <div
              key={d.id}
              className="
                relative bg-slate-950 pt-[30px] pb-6 rounded-2xl
                text-center flex flex-col h-full
              "
            >
              {/* IMAGE */}
              <img
                src={d.img}
                alt={d.name}
                className="
                   w-[60px] h-[60px]
                    sm:w-[80px] sm:h-[80px]
                    md:w-[100px] md:h-[100px]
                    lg:w-[120px] lg:h-[120px]
                  rounded-full
                  absolute -top-7 left-1/2 -translate-x-1/2
                "
              />

              {/* CONTENT */}
              <div className="flex-1 flex flex-col">
                <p
                  className="
                    text-[16px] font-normal text-gray-100
                    leading-[1.25rem] mt-8 px-16
                    line-clamp-2 min-h-[2.6rem]
                  "
                >
                  {d.name}
                </p>

                {/* PRICE */}
                <div className="flex justify-center items-center gap-2 my-2">
                  <span className="text-sm text-red-500 line-through font-light">
                    {d.price} AED
                  </span>
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
                      className={`px-2 py-0.5 text-m rounded transition
                        ${
                          selectedSize[d.id] === s
                            ? "bg-orange-400 text-black"
                            : "bg-slate-950 text-gray-400"
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
                className={`mt-4 mx-10 text-sm py-2 rounded-lg font-semibold transition-all
                  ${
                    isInCart(d.id)
                      ? "bg-green-500 text-black"
                      : "bg-[#FE9232] text-black hover:opacity-90"
                  }
                `}
              >
                {isInCart(d.id)
                  ? `✓ Added (${
                      cart.find(
                        (c) =>
                          c.id === d.id &&
                          c.size === selectedSize[d.id]
                      )?.qty || 1
                    })`
                  : "+ Add"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
