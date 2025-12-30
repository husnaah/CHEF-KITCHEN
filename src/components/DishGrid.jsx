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
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${
              showOrderPanel
                ? "lg:grid-cols-3 xl:grid-cols-4"
                : "lg:grid-cols-4 xl:grid-cols-5"
            } gap-4 sm:gap-4 gap-y-10 sm:gap-y-12`}
          >



          {filteredDishes.map((d) => (
            <div
              key={d.id}
              className="
                relative bg-slate-950  pt-10 sm:pt-12 pb-4 rounded-2xl
                text-center flex flex-col h-full
              "
            >
              <img
                  src={d.img}
                  alt={d.name}
                  className="
                    w-[88px] h-[88px]          /* REAL phones */
                    sm:w-[96px] sm:h-[96px]    /* sm devices */
                    md:w-[104px] md:h-[104px]
                    lg:w-[105px] lg:h-[105px]
                    object-cover
                    rounded-full
                    absolute
                    -top-9 sm:-top-10
                    left-1/2 -translate-x-1/2
                  "
                />



              {/* CONTENT */}
              <div className="flex-1 flex flex-col">
                <p
                  className="
                     text-sm sm:text-[15px] font-normal text-gray-100
                    leading-snug mt-7  px-4
                    line-clamp-2 min-h-[2.4rem]
                  "
                >
                  {d.name}
                </p>

                {/* PRICE */}
                <div className="flex justify-center items-center gap-2 mt-2">
                  <span className="text-xs text-red-500 line-through ">
                    {d.price} AED
                  </span>
                  <span className="text-sm text-green-400 font-medium">
                    {d.price} AED
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {d.bowls} Bowls available
                </p>

                {/* SIZE */}
                <div className="flex justify-center gap-2 mt-3">
                  {["S", "M", "L"].map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setSelectedSize((p) => ({ ...p, [d.id]: s }))
                      }
                      className={`px-2 py-0.5 text-xs rounded-md transition
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
                 onClick={() => addToCart(d, selectedSize[d.id])}
                className={`mt-4 mx-4 text-sm py-2 rounded-lg font-semibold transition
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
