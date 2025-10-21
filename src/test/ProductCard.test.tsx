import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import ProductCard from "../components/ProductCard";

const product = { id: 1, title: "Apple", price: 50, image: "apple.jpg" };

test("renders ProductCard and Add to Cart", async () => {
  const user = userEvent.setup();
  const onAddMock = vi.fn();

  render(
    <MemoryRouter>
      <ProductCard product={product} onAdd={onAddMock} />
    </MemoryRouter>
  );

  // Check image
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "apple.jpg");
  expect(img).toHaveAttribute("alt", "Apple");

  // Check text
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("RM50.00")).toBeInTheDocument();

  // Click Add to Cart
  const button = screen.getByRole("button", { name: /add to cart/i });
  await user.click(button);
  expect(onAddMock).toHaveBeenCalledTimes(1);
  expect(onAddMock).toHaveBeenCalledWith(product);
});
