import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/promo");
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

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
      ) : (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-64 md:h-96">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BannerCarousel;
