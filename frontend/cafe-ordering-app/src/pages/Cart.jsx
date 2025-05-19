import { useEffect, useState } from "react";
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Ambil data cart dari localStorage saat pertama render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Hitung total per item dan grand total
  const getItemTotal = (item) => item.price * item.quantity;
  const getGrandTotal = () =>
    cart.reduce((total, item) => total + getItemTotal(item), 0);

  const handleBayar = () => {
    if (cart.length === 0) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const totalPrice = getGrandTotal();
    const order = {
      id: Date.now(),
      time,
      price: totalPrice,
      desc: cart.map(item => `${item.quantity} ${item.alt}`).join(","),
      table: "12", // diganti dengan qr nanti
      status: "Menunggu Konfirmasi"
    };

    // menyimpan ke localstorage myorders
    const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    localStorage.setItem("myOrders", JSON.stringify([order, ...myOrders]));

    const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];
    localStorage.setItem("pendingOrders", JSON.stringify([order, ...pendingOrders]));

    // Kosongkan keranjang
    localStorage.removeItem("cart");

    // Redirect ke halaman pesanan (optional pakai navigate atau link)
    window.location.href = "/pesanan"; // jika pakai routing
  };

  const handleRemoveItem = (id) => {
    // filter id item, membuat daftar baru tanpa item yang dihapus
    const updatedCart = cart.filter(item => item.id !== id);
    // update local storage menjadi dafar baru tanpa item tsb
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <div className="pt-28 px-5 pb-28">
      <h1 className="text-2xl font-semibold text-black mb-4">Keranjang</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Keranjang kamu masih kosong.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded-xl shadow-sm bg-white"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-black font-semibold">{item.alt}</h2>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x Rp {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-green-800">
                Rp {getItemTotal(item).toLocaleString()}
              </p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 text-sm"
              > 
                <Trash2/>
              </button>
            </div>
          ))}

          {/* Grand Total */}
          <div className="text-right mt-4">
            <p className="text-lg font-bold text-black">
              Total: Rp {getGrandTotal().toLocaleString()}
            </p>
          </div>

          {/* Tombol Bayar */}
          <button
            onClick={handleBayar}
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl font-semibold mt-4"
          >
            Bayar ke Kasir
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
