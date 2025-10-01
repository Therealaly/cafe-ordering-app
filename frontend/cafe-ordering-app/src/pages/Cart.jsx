import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/common/CartItem";
import EmptyState from "../components/common/EmptyState";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    loading,
    error,
    removeItem,
    getItemTotal,
    getGrandTotal,
    createOrder,
    checkRequirements
  } = useCart();

  useEffect(() => {
    checkRequirements();
  }, [checkRequirements]);

  const handlePayment = async () => {
    await createOrder();
  };

  if (error) {
    return (
      <div className="pt-28 px-5 pb-28">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 px-5 pb-28">
      <h1 className="text-2xl font-semibold text-black mb-4">Keranjang</h1>
      {cart.length === 0 ? (
        <EmptyState 
          message="Keranjang kamu masih kosong"
          actionText="Lihat Menu"
          onAction={() => navigate('/home')}
        />
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={removeItem}
              getItemTotal={getItemTotal}
            />
          ))}
          {/* Grand Total */}
          <div className="text-right mt-4">
            <p className="text-lg font-bold text-black">
              Total: Rp {getGrandTotal().toLocaleString()}
            </p>
          </div>
          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold mt-4 transition-colors"
          >
            {loading ? "Memproses..." : "Bayar ke Kasir"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
