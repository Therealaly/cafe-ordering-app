import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuList = ({ onSelect }) => {
  const [menus, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu()
  }, []);

  const foodMenu = menus.filter(menus => menus.category === "Makanan");
  const drinkMenu = menus.filter(menus => menus.category === "Minuman");

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
                <p className="text-sm text-black font-semibold">{menu.price.toLocaleString("ID")}</p> 
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

  const renderMenuSectionSkeleton = (title, count = 2) => (
    <div className="flex flex-col space-y-3">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center justify-between gap-4 p-2 border border-gray-200 rounded-xl shadow-sm bg-white animate-pulse"
          >
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-2xl h-24 w-20 bg-gray-200" />
              <div className="flex flex-col space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded-lg" />
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
        {renderMenuSectionSkeleton("Minuman")}
        {renderMenuSectionSkeleton("Makanan")}
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
