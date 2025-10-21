import axios from "axios";
import type { Product } from "../types/product";

export const fetchProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data as Product[];
  } catch (err) {
    console.error(err);
  }
};

export const fetchProductById = async (id: string | number) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data as Product;
  } catch (err) {
    console.error(err);
    return null;
  }
};
