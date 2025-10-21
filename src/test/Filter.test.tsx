import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import React from "react";
import { MemoryRouter } from "react-router-dom"; // <-- Add this
import Store from "../pages/Store";
import { CartProvider } from "../lib/context/CartContext";
import * as api from "../lib/api/products";

const mockProducts = [
  { id: 1, title: "Apple", category: "fruit", price: 50, image: "apple.jpg" },
  { id: 2, title: "Orange", category: "fruit", price: 30, image: "orange.jpg" },
  {
    id: 3,
    title: "Carrot",
    category: "vegetable",
    price: 20,
    image: "carrot.jpg",
  },
];

vi.spyOn(api, "fetchProducts").mockResolvedValue(mockProducts);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <CartProvider>{children}</CartProvider>
  </MemoryRouter>
);

test("filters products by search, category, and max price", async () => {
  const user = userEvent.setup();
  render(<Store />, { wrapper });

  // Wait for products to load
  expect(await screen.findByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Orange")).toBeInTheDocument();
  expect(screen.getByText("Carrot")).toBeInTheDocument();

  // Search filter
  const searchInput = screen.getByPlaceholderText(/search products/i);
  await user.type(searchInput, "ap");
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.queryByText("Orange")).toBeNull();
  expect(screen.queryByText("Carrot")).toBeNull();

  // Category filter
  await user.clear(searchInput);
  const select = screen.getByRole("combobox");
  await user.selectOptions(select, "vegetable");
  expect(screen.getByText("Carrot")).toBeInTheDocument();
  expect(screen.queryByText("Apple")).toBeNull();
  expect(screen.queryByText("Orange")).toBeNull();

  // Max price filter
  const priceInput = screen.getByPlaceholderText(/max price/i);
  await user.clear(priceInput);
  await user.type(priceInput, "40");
  expect(screen.getByText("Carrot")).toBeInTheDocument();
  expect(screen.queryByText("Apple")).toBeNull();
  expect(screen.queryByText("Orange")).toBeNull();

  // Reset category to all
  await user.selectOptions(select, "all");
  expect(screen.getByText("Orange")).toBeInTheDocument();
  expect(screen.getByText("Carrot")).toBeInTheDocument();
  expect(screen.queryByText("Apple")).toBeNull();
});
