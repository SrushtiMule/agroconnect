import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { safeReadStorage, safeWriteStorage } from '../utils/storage';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  finalTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return safeReadStorage<CartItem[]>('agroconnect_cart', []);
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    safeWriteStorage('agroconnect_cart', items);
  }, [items]);

  const addToCart = (product: Product, quantity: number = product.minOrderQuantity || 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedDelivery: 'AGROEXPRESS',
          appliedDiscount: 0,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'KISAN10' || normalized === 'FRESHFARM') {
      setCouponCode(normalized);
      setDiscountPercent(10);
      return { success: true, message: 'Coupon applied! 10% Farm-Direct discount added.' };
    }
    if (normalized === 'AGROFIRST' || normalized === 'HARVEST15') {
      setCouponCode(normalized);
      setDiscountPercent(15);
      return { success: true, message: 'Super Saver! 15% Welcome discount applied.' };
    }
    return { success: false, message: 'Invalid coupon code. Try KISAN10 or HARVEST15' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  // Calculate Subtotal with Tiered Product Discounts
  const subtotal = items.reduce((acc, item) => {
    let pricePerUnit = item.product.pricePerUnit;
    if (item.product.tierDiscounts) {
      for (const tier of item.product.tierDiscounts) {
        if (item.quantity >= tier.minQuantity) {
          pricePerUnit = item.product.pricePerUnit * (1 - tier.discountPercent / 100);
        }
      }
    }
    return acc + pricePerUnit * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = items.length > 0 ? (subtotal > 1500 ? 0 : 75) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        deliveryFee,
        finalTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
