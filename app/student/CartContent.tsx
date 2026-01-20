import { createContext, useContext, useState } from "react";

type CartType = {
  [key: string]: number;
};

type CartContextType = {
  cart: CartType;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: any }) {
  const [cart, setCart] = useState<CartType>({});

  const addToCart = (id: string) => {
    setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((p) => {
      const qty = (p[id] || 0) - 1;
      if (qty <= 0) {
        const copy = { ...p };
        delete copy[id];
        return copy;
      }
      return { ...p, [id]: qty };
    });
  };

  const totalItems = Object.values(cart).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider missing");
  return ctx;
}
