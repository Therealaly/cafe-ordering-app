import BannerCarousel from "../components/home/BannerCarousel"
import RecommendedMenu from "../components/home/RecommendedMenu"
import MenuList from "../components/home/MenuList"

const Home = () => {
  return (
    <div className="pt-20 left-0 right-0 py-4 space-y-3">
      <BannerCarousel />
      <RecommendedMenu />
      <MenuList/>
    </div>
  );
};

export default Home;
