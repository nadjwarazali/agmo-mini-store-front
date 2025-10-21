// src/test/Cart.test.tsx
import { renderHook, act } from "@testing-library/react";
import { test, expect } from "vitest";
import { CartProvider, useCart } from "../lib/context/CartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

test("cart add, increment, decrement, remove", () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  const product = { id: 1, title: "Apple", price: 50 };

  // Add to cart
  act(() => result.current.addToCart(product));
  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].quantity).toBe(1);

  // Remove
  act(() => result.current.removeFromCart(1));
  expect(result.current.cart).toHaveLength(0);
});
