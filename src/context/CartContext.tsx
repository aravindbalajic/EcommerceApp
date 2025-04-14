import React, { createContext, useContext, useState } from 'react';

export type Product = {
  id?: number;
  name: string;
  price: string;
  description: string;
  image: string;
};

export type Order = {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: string;
    price: string;
  }[];
  total: number;
  status: 'Processing' | 'Delivered';
};

type CartContextType = {
  cartItems: Product[];
  orderHistory: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Order) => {
    setOrderHistory([order, ...orderHistory]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      orderHistory,
      addToCart, 
      removeFromCart,
      clearCart,
      addOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 