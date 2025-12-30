import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("Dine In");

  // ADD TO CART
  const addToCart = (dish, size) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === dish.id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      }

      return [...prev, { ...dish, size, qty: 1, note: "" }];
    });
  };

  // DECREASE QTY
  const decreaseQty = (id, size) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // REMOVE COMPLETELY
  const removeItemCompletely = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // UPDATE NOTE
  const updateNote = (id, size, note) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, note } : i
      )
    );
  };

  // TOTALS
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        orderType,
        setOrderType,
        addToCart,
        decreaseQty,
        removeItemCompletely,
        updateNote,
        subtotal,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook (important 🔥)
export const useCart = () => useContext(CartContext);
