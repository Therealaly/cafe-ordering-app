import { useState, useEffect } from "react";
import BannerCarousel from "../components/home/BannerCarousel"
import RecommendedMenu from "../components/home/RecommendedMenu"
import MenuList from "../components/home/MenuList"
import MenuPopup from "../components/home/MenuPopup"

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useState(() => {
    // mengambil dari localstorage
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // simpan ke localstorage saat cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (menuItemWithQty) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item._id === menuItemWithQty._id);
      if (exists) {
        return prevCart.map(item =>
          item._id === menuItemWithQty._id ? {...item, quantity: item.quantity + menuItemWithQty.quantity } : item
        );
      } else {
        return [...prevCart, menuItemWithQty];
      }
    });

    setSelectedMenu(null);
  };

  return (
    <div className="pt-20 left-0 right-0 py-4 space-y-3">
      <BannerCarousel />
      <RecommendedMenu onSelect={setSelectedMenu}/>
      <MenuList onSelect={setSelectedMenu}/>

      {selectedMenu && (
        // disini mengoper props (fungsi) dari home (induk) ke menuPopUp
        <MenuPopup
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Home;
