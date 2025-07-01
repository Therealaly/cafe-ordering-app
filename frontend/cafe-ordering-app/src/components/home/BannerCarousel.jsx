import React from "react";
import Slider from "react-slick";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useActiveBanners } from "../../hooks/useActiveBanners";

const BannerCarousel = () => {
  const { banners, loading } = useActiveBanners();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full mb-7">
      {loading ? (
        <div className="w-full h-64 rounded-xl bg-gray-200 animate-pulse" />
      ) : banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-64 md:h-96">
              <img
                src={banner.image}
                alt={banner.title || `Banner ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-64 rounded-xl bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada banner aktif</p>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
