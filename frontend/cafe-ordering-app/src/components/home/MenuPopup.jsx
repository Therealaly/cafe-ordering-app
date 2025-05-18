import { useState } from "react";

const MenuPopup = ({ menu, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black backdrop-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold text-black">{menu.alt}</h2>
        <p className="text-sm text-gray-600 mb-2">Rp {menu.price.toLocaleString()}</p>
        <img src={menu.image} alt={menu.alt} className="w-full h-40 object-cover rounded-lg mb-3" />

        <div className="flex items-center justify-between my-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded text-black"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >-</button>
          <span className="text-lg font-semibold text-black">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded text-black"
            onClick={() => setQuantity(q => q + 1)}
          >+</button>
        </div>

        <button
          className="w-full py-2 bg-green-700 text-white rounded-xl"
          onClick={() => {
            onAddToCart({ ...menu, quantity });
            onClose();
          }}
        >
          Tambah ke Keranjang
        </button>
        <button className="w-full mt-2 py-1 text-sm text-gray-500" onClick={onClose}>Batal</button>
      </div>
    </div>
  );
};

export default MenuPopup;
