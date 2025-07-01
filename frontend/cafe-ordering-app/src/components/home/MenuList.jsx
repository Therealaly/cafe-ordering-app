import React from "react";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useMenus } from "../../hooks/useMenus";
import { formatCurrency } from "../../utils/orderUtils";

const MenuList = ({ onSelect }) => {
  const { loading, getMenusByCategory } = useMenus();
  
  const foodMenu = getMenusByCategory("Makanan");
  const drinkMenu = getMenusByCategory("Minuman");

  const renderMenuSection = (title, menus) => (
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-normal text-black">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {menus.map(menu => (
          <div key={menu._id} className="flex flex-row items-center justify-between gap-4 p-2 border border-gray-200 rounded-xl shadow-sm bg-white">
            <div className="flex flex-row items-center gap-4">
              <img
                src={menu.image}
                alt={menu.name}
                loading="lazy"
                className="rounded-2xl h-24 w-20 object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-black font-semibold">{menu.name}</p>
                <p className="text-sm text-black font-semibold">Rp {formatCurrency(menu.price)}</p> 
              </div>
            </div>
            <button
              className="text-sm bg-green-900 text-white px-3 py-1 rounded-lg border-2 hover:bg-green-950 border-green-800 transition"
              onClick={() => onSelect(menu)}
            >
              Tambah
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col space-y-6 h-fit px-5 pb-20">
        <div className="flex flex-col">
          <h1 className="text-black text-2xl font-semibold pb-1">Semua Menu</h1>
          <p className="text-black text-sm font-light">Pesan sepuasnya</p>
        </div>
        <LoadingSkeleton rows={4} />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-6 h-fit px-5 pb-20">
      <div className="flex flex-col">
        <h1 className="text-black text-2xl font-semibold pb-1">Semua Menu</h1>
        <p className="text-black text-sm font-light">Pesan sepuasnya</p>
      </div>
      {renderMenuSection("Minuman", drinkMenu)}
      {renderMenuSection("Makanan", foodMenu)}
    </div>
  );
};

export default MenuList;
