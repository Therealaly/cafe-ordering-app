const OrdersHistory = () => {
  const history = [
    { id: 1, date: "2025-04-27", price: "25.000", desc: "1 Cafe latte", info: "Takeaway" },
    { id: 2, date: "2025-05-01", price: "25.000", desc: "1 Chocolate", info: "Takeaway" },
    { id: 3, date: "2025-05-09", price: "122.000", desc: "2 Matcha Latte, 2 Fried Rice", info: "Dine-in" }
  ];

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex flex-col">
      <div className="border-b-2 border-gray-300">
        <h1 className="text-black text-xl font-semibold pb-4 pt-5 mx-5">
          Riwayat Pesanan
        </h1>
      </div>

      {history.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p>Riwayat pesanan kamu akan ditampilkan disini!</p>
        </div>
      ) : (
        history.map(item => (
          <div key={item.id} className="flex flex-row justify-between items-start px-5 py-3 mb-4 border border-gray-200 shadow-md bg-white">
            <div className="flex flex-col gap-2 text-black">
              <h2 className="font-semibold">{formatDate(item.date)}</h2>
              <p className="text-sm font-light">{item.desc}</p>
            </div>
            <div className="flex gap-1 flex-col text-right text-black">
              <p className="font-bold text-lg">Rp {item.price}</p>
              <p className="text-sm">{item.info}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersHistory;
