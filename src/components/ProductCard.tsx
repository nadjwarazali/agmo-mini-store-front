import { Link } from "react-router-dom";
interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card">
        {product.image && <img src={product.image} className="product-image" />}
        <div className="flex flex-col flex-grow justify-between p-5">
          <div>
            <p className="font-bold text-md tracking-tight mb-2 text-base/6">
              {product.title}
            </p>
            <p className="text-sm">RM{product.price.toFixed(2)}</p>
          </div>
          <button
            className="outline-button mt-10 z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
