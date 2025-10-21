import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../lib/api/products";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCart } from "../lib/context/CartContext";

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const data = await fetchProductById(productId);
        setProduct(data);
      }
    };

    loadProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

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

  return (
    <section>
      <div
        className="flex flex-row items-center gap-2 cursor-pointer my-5 mt-10 hover:font-bold"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack />
        <p>Go Back</p>
      </div>
      <div className="row gap-10">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full max-w-md h-96 product-image rounded-xl"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-2">
            RM{product.price.toFixed(2)}
          </p>
          <p>{product.description}</p>
          <button
            className="outline-button mt-10"
            onClick={() => {
              handleAdd(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
