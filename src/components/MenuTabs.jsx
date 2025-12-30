export default function MenuTabs({
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
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
  );
}
