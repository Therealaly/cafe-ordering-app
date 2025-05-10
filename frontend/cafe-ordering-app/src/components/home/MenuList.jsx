const MenuList = () => {
  const menu = [
    { id: 1, image: "../src/assets/dev/iced-coffee-latte.jpg", alt: "Cafe Latte", tags: "drink" },
    { id: 2, image: "../src/assets/dev/chocolate.jpg", alt: "Chocolate", tags: "drink" },
    { id: 3, image: "../src/assets/dev/matcha-latte.jpg", alt: "Matcha", tags: "drink" },
    { id: 4, image: "../src/assets/dev/espresso.jpg", alt: "Espresso", tags: "drink" },
    { id: 5, image: "../src/assets/dev/croissant.jpg", alt: "Croissant", tags: "food" },
    { id: 6, image: "../src/assets/dev/fried-rice.jpg", alt: "Fried Rice", tags: "food" },
  ];

  const foodMenu = menu.filter(item => item.tags === "food");
  const drinkMenu = menu.filter(item => item.tags === "drink");

  const renderMenuSection = (title, items) => (
    <div className="flex flex-col space-y-3">
      <h2 className="text-lg font-normal text-black">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map(item => (
          <div key={item.id} className="flex flex-row items-center justify-between gap-4 p-2 border border-gray-200 rounded-xl shadow-sm bg-white">
            <div className="flex flex-row items-center gap-4">
              <img
                src={item.image}
                alt={item.alt}
                className="rounded-2xl h-24 w-20 object-cover"
              />
              <p className="text-sm text-black font-semibold">{item.alt}</p>
            </div>
            <button
              className="text-sm bg-green-900 text-white px-3 py-1 rounded-lg border-2 hover:bg-green-950 border-green-800 transition"
              onClick={() => console.log(`Tambah ${item.alt}`)}
            >
              Tambah
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-6 h-fit px-5 pb-20">
      <div className="flex flex-col">
        <h1 className="text-black text-2xl font-semibold pb-1">Semua Menu</h1>
        <p className="text-black text-sm font-light">Pesan sepuasnya</p>
      </div>

      {renderMenuSection("Minuman", drinkMenu)}
      {renderMenuSection("Makanan", foodMenu)}
    </div>
  );
};

export default MenuList;
