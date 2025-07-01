import { useState } from "react";
import BannerCarousel from "../components/home/BannerCarousel";
import RecommendedMenu from "../components/home/RecommendedMenu";
import MenuList from "../components/home/MenuList";
import MenuPopup from "../components/home/MenuPopup";
import { useCart } from "../hooks/useCart";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { addItem } = useCart();

  const handleAddToCart = (menuItemWithQty) => {
    addItem(menuItemWithQty);
    setSelectedMenu(null);
  };

  return (
    <div className="pt-20 left-0 right-0 py-4 space-y-3">
      <BannerCarousel />
      <RecommendedMenu onSelect={setSelectedMenu} />
      <MenuList onSelect={setSelectedMenu} />

      {selectedMenu && (
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
