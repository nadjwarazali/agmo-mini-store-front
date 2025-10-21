import { useNavigate } from "react-router-dom";
import { useCart } from "../lib/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto ">
      <h1 className="text-xl font-bold mb-10">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="row justify-start gap-5">
          <p>Cart is empty...</p>
          <button onClick={() => navigate("/")} className="outline-button">
            Start shopping now 🛒
          </button>
        </div>
      ) : null}
      {cart.map((item) => (
        <div key={item.id}>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16"
              loading="lazy"
            />
            <div className="flex-1">
              <p>{item.title}</p>
              <p>
                RM{item.price} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="outline-button"
            >
              Remove
            </button>
          </div>
          {item.id === cart[cart.length - 1].id ? null : (
            <div className="flex w-full border-b my-5" />
          )}
        </div>
      ))}
    </div>
  );
}
