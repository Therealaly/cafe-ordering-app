import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart'; // Import the cart hook

const UpperBar = () => {
  const storedUser = sessionStorage.getItem("user");
  let userName = "Tamu";

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userName = user.name ?? "Tamu";
    } catch (e) {
      console.error("Gagal parse user dari sessionStorage", e);
    }
  }

  // ✅ ADD: Get cart data
    const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="fixed top-0 left-0 right-0 flex w-full h-20 flex-row justify-between p-3 z-50 bg-green-950">
      <div className="max-h-full">
        <img src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163" alt="Logo Warna Kopi" className='h-full'/>
      </div>
      <div className='flex flex-row w-3/5 gap-4 p-3 items-center justify-end'>
        <p>Halo, {userName}</p>
        {/* ✅ UPDATED: Cart icon with badge */}
        <NavLink to={"/keranjang"} className="max-h-full w-fit relative">
          <ShoppingCart size={24} className='text-inherit'/>
          {/* ✅ ADD: Red notification badge */}
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
              {totalItems > 99 ? '99+' : totalItems}
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default UpperBar;