import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const UpperBar = () => {
  const storedUser = localStorage.getItem("user");
  let userName = "Tamu";

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userName = user.name ?? "Tamu";
    } catch (e) {
      console.error("Gagal parse user dari localStorage", e);
    }
  }


  return (
    <div className="fixed top-0 left-0 right-0 flex w-full h-20 flex-row justify-between p-3 z-50 bg-green-950">
      <div className="max-h-full">
        <img src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163" alt="Logo Warna Kopi" className='h-full'/>
      </div>
      <div className='flex flex-row w-3/5 gap-4 p-3 items-center justify-end'>
        <p>Halo, {userName}</p>
        <NavLink to={"/keranjang"} className="max-h-full w-fit">
          <ShoppingCart size={24} className='text-inherit'/>
        </NavLink>
      </div>
    </div>
  );
};

export default UpperBar;