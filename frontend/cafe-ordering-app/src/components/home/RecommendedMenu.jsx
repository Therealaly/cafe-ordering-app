const RecommendedMenu = () => {
  const recommended = [
    { id: 1, image: "../src/assets/dev/iced-coffee-latte.jpg", alt: "Cafe Latte" },
    { id: 2, image: "../src/assets/dev/iced-coffee-latte.jpg", alt: "Cappuccino" },
    { id: 3, image: "../src/assets/dev/matcha-latte.jpg", alt: "Matcha" },
    { id: 4, image: "../src/assets/dev/espresso.jpg", alt: "Espresso" },
    { id: 5, image: "../src/assets/dev/iced-coffee-latte.jpg", alt: "Affogato" },
  ];

  return (
    <div className="flex flex-col space-y-2 h-fit">
      <div className="flex flex-col mx-5">
        <h1 className="text-black text-2xl font-semibold pb-1">
          Menu Rekomendasi
        </h1>
        <p className="text-black text-sm font-light pb-2">
          Pilihan menu menarik untukmu
        </p>
      </div>

      {/* scrollable Menu */}
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-5 pb-5 element">
        <div className="flex space-x-5 w-max">
          {recommended.map(item => (
            <div key={item.id} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.alt}
                className="rounded-full h-24 w-24 object-cover"
              />
              <p className="text-sm text-black mt-2">{item.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedMenu;