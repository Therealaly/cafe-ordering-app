import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => { const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/promo");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
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
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-64">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
