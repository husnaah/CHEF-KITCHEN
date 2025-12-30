import { AiOutlineSearch } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

export default function MenuHeader({
  search,
  setSearch,
  cartCount,
  onCartClick,
}) {
  const today = new Date();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-10">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
          Chef Kitchen
        </h1>
        <p className="text-sm text-gray-400 font-normal">
          {today.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3 items-center w-full sm:w-auto">

        {/* SEARCH */}
        <div className="relative flex-1 lg:block">
          <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 text-lg" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for food, coffee, etc.."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#2b2f3a]
              text-sm text-gray-200 placeholder-gray-400
              border border-white/10 focus:border-orange-400/60
              outline-none transition-all duration-200"
          />
        </div>

        {/* CART BUTTON */}
        <button
          onClick={onCartClick}
          className="hidden lg:flex relative p-3 rounded-xl bg-[#FE9232]
            transition-opacity duration-200 hover:opacity-70 active:opacity-100"
        >
          <FiShoppingCart className="text-xl" />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-orange-400 text-xs w-5 h-5 rounded-full grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
