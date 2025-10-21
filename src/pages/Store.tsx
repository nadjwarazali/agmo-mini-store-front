import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/api/products";
import { useCart } from "../lib/context/CartContext";

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState(""); // search state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data ?? []);
      setFilteredProducts(data ?? []);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (search) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      results = results.filter((item) => item.category === selectedCategory);
    }

    if (maxPrice) {
      results = results.filter((item) => item.price <= maxPrice);
    }

    setFilteredProducts(results);
  }, [search, selectedCategory, maxPrice, products]);

  function handleAdd(product: Product) {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image!,
        quantity: 1,
      });
    }
  }

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <section>
      <header className="flex items-center justify-between my-12">
        <h1 className="text-4xl">Agmo Store</h1>
        <div className="flex flex-row gap-3 items-center">
          <input
            type="search"
            className="p-5 h-10 w-full border rounded-full"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border h-10 px-4 rounded-full"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all" className="option-button">
              All Categories
            </option>
            {Array.from(new Set(products.map((p) => p.category))).map(
              (category) => (
                <option
                  className="option-button"
                  key={category}
                  value={category}
                >
                  {capitalize(category!)}
                </option>
              )
            )}
          </select>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-[0.7em]">
              RM
            </span>
            <input
              type="number"
              placeholder="Max Price"
              className="border rounded-full h-10 pl-10 pr-3 w-50    
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </header>
      <div className="grid-products">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={(p: Product) => handleAdd(p)}
          />
        ))}
      </div>
    </section>
  );
}
