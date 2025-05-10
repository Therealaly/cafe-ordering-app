import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const UpperBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex w-full h-20 flex-row justify-between p-3 z-50 bg-green-950">
      <div className="max-h-full">
        <img src="../src/assets/logo-hijau.png" alt="Logo Warna Kopi" className='h-full'/>
      </div>
      <div className='flex flex-row w-3/5 justify-between p-3 items-center'>
        <p>Halo, Lorem Ipsum</p>
        <NavLink to={"/keranjang"} className="max-h-full w-fit">
          <ShoppingCart size={24} className='text-inherit'/>
        </NavLink>
      </div>
    </div>
  );
};

export default UpperBar;