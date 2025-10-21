import { Link } from "react-router-dom";
import useTheme from "../lib/hooks/theme";
import { useCart } from "../lib/context/CartContext";

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 w-full bg-primary dark:bg-primary-dark shadow-md z-50 px-6 py-4 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsDark(!isDark)}
          className={`${isDark ? "shadow-inner-dark" : "shadow-inner-light"} relative w-14 h-7 flex items-center cursor-pointer rounded-full transition bg-[var(--color-secondary)]`}
        >
          <span
            className={`w-6 h-6 flex items-center justify-center bg-white dark:bg-[var(--color-primary)] rounded-full shadow-md absolute transition-all ${
              isDark ? "translate-x-7" : "translate-x-1"
            }`}
          >
            {isDark ? "🌙" : "🌞"}
          </span>
        </div>
        <Link to="/" className="text-gray-700 dark:text-gray-200">
          🏠 Home
        </Link>
        <Link
          to="/cart"
          className="text-gray-700 dark:text-gray-200 items-center flex flex-row gap-2 "
        >
          🛒 Cart
          {cart.length > 0 && (
            <span className="bg-[var(--color-secondary)] text-white text-xs rounded-full w-6 h-5 px-2 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
