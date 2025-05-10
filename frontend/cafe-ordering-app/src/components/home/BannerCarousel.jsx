import { useEffect, useRef, useState } from "react";

const BannerCarousel = () => {
  const banners = [
    { id: 1, image: "../src/assets/banner/banner-plhdr-1.png", alt: "Promo 1" },
    { id: 2, image: "../src/assets/banner/banner-plhdr-2.png", alt: "Promo 2" },
    { id: 3, image: "../src/assets/banner/banner-plhdr-3.png", alt: "Promo 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      scrollToIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const child = carousel.children[index];
    if (child) {
      carousel.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth"
        // onScroll={() => {
        //   // Optional: update indicator when manually scrolled
        //   const scrollLeft = carouselRef.current.scrollLeft;
        //   const width = carouselRef.current.offsetWidth;
        //   const index = Math.round(scrollLeft / width);
        //   setCurrentIndex(index);
        // }}
      >
        {banners.map((banner, i) => (
          <img
            key={banner.id}
            src={banner.image}
            alt={banner.alt}
            className="inline-block h-64 w-full object-cover"
          />
        ))}
      </div>

      {/* Indicator bullets */}
      <div className="flex justify-center space-x-2 mt-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-green-900 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
