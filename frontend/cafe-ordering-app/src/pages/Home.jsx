import { useState } from "react";
import BannerCarousel from "../components/home/BannerCarousel"
import RecommendedMenu from "../components/home/RecommendedMenu"
import MenuList from "../components/home/MenuList"
import MenuPopup from "../components/home/MenuPopup"

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? {...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item];
      }
    })
  };

  return (
    <div className="pt-20 left-0 right-0 py-4 space-y-3">
      <BannerCarousel />
      <RecommendedMenu onSelect={setSelectedMenu}/>
      <MenuList onSelect={setSelectedMenu}/>

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
