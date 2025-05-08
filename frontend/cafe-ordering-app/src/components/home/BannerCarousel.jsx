const BannerCarousel = () => {
  const banners = [
    { id: 1, image: "../src/assets/banner/banner-plhdr-1.png", alt: "Promo 1" },
    { id: 2, image: "../src/assets/banner/banner-plhdr-2.png", alt: "Promo 2" },
    { id: 3, image: "../src/assets/banner/banner-plhdr-3.png", alt: "Promo 3" },
  ];

  return (
    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth element">
      {banners.map(banner => (
        <img
          key={banner.id}
          src={banner.image}
          alt={banner.alt}
          className="inline-block h-64 w-full object-cover md: h-fit"
        />
      ))}
    </div>
  );
};

export default BannerCarousel;