export default function ReceiptModal({
  showReceipt,
  setShowReceipt,
  receiptData,
}) {
  if (!showReceipt || !receiptData) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-3 sm:px-4">
      <div
        className="
          bg-[#1f1d29] text-gray-200
          w-full max-w-sm sm:max-w-md
          rounded-2xl
          max-h-[90vh]
          flex flex-col
        "
      >
        {/* ================= HEADER ================= */}
        <div className="text-center p-5 pb-2">
          <h2 className="text-base font-semibold">Order Receipt</h2>

          <p className="text-[11px] text-gray-400 mt-1">
            #{receiptData.id} • {receiptData.date}
          </p>

          <span className="
            inline-block mt-2 px-3 py-1
            text-xs rounded-full
            bg-orange-400 text-black font-medium
          ">
            {receiptData.orderType}
          </span>
        </div>

        {/* ================= BODY (SCROLL) ================= */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 mt-3 no-scrollbar">
          {/* ITEMS */}
          <div className="space-y-2 text-xs mb-4">
            {receiptData.items.map((i, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between gap-3">
                  <span className="truncate max-w-[70%]">
                    {i.qty} × {i.name} ({i.size})
                  </span>
                  <span className="shrink-0">
                    {(i.price * i.qty).toFixed(2)}
                  </span>
                </div>

                {/* NOTE */}
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

        {/* ================= FOOTER ================= */}
        <div className="p-4 sm:p-5 border-t border-gray-700">
          <p className="text-center text-xs text-gray-400 mb-3">
            🙏 Thank you for ordering with{" "}
            <span className="text-orange-400">Chef Kitchen</span>
          </p>

          <button
            onClick={() => setShowReceipt(false)}
            className="
              w-full bg-orange-400 py-2.5
              rounded-lg text-black
              text-sm font-semibold
              active:scale-95 transition
            "
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
