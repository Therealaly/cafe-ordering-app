import { NavLink } from 'react-router-dom';
import { House, ClipboardList, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-50 px-2 rounded-t-2xl'>
      <div className='flex flex-row py-2 justify-around w-full'>
        <NavLink to={"/"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-800 border-t-2 border-green-800 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <House size={24} className='text-inherit'/>
          <span className='text-sm'>Home</span>
        </NavLink>
        <NavLink to={"/pesanan"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-800 border-t-2 border-green-800 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <ClipboardList size={24} className='text-inherit'/>
          <span className='text-sm'>Pesanan</span>
        </NavLink>
        <NavLink to={"/profil"} className={({ isActive }) => `flex flex-col items-center pt-1.5 w-20 ${isActive ? 'text-green-800 border-t-2 border-green-800 font-semibold' : 'text-gray-600 border-t-2 border-white'}`}>
          <User size={24} className='text-inherit'/>
          <span className='text-sm'>Profil</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
