import { ClockFading, CookingPot, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom"; // Pastikan kamu menggunakan react-router

const ActiveOrders = () => {
  const order = [
    // // { id: 34, time: "12:10", price: "45.000", desc: "1 Cafe latte, 1 Croissant", table: "12", status: "Menunggu Konfirmasi" },
    // // { id: 20, time: "12:00", price: "25.000", desc: "1 Chocolate", table: "Takeaway", status: "disiapkan" },
    // { id: 17, time: "11:45", price: "50.000", desc: "2 Matcha Latte", table: "12", status: "Selesai" }
  ];

  const statusMap = {
    "Menunggu Konfirmasi": {
      icon: <ClockFading className="text-gray-700" />,
      color: "text-gray-700",
    },
    disiapkan: {
      icon: <CookingPot className="text-yellow-500" />,
      color: "text-yellow-500",
    },
    Selesai: {
      icon: <CircleCheck className="text-green-600" />,
      color: "text-green-600",
    },
  };

  return (
    <div className="w-full min-h-5">
      <div className="flex flex-col mx-5 space-y-3">
        <h1 className="text-black text-xl font-semibold pb-1 pt-5">
          Pesanan Saya
        </h1>

        {order.length === 0 ? (
          <div className="text-center p-4  border border-gray-200 rounded-xl shadow-sm bg-white">
            <p className="text-gray-500 font-medium mb-4">
              Belum ada pesanan aktif, yuk pesan dulu!
            </p>
            <Link
              to="/"
              className="px-4 py-2 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition"
            >
              Pesan sekarang
            </Link>
          </div>
        ) : (
          order.map((item) => {
            const status = statusMap[item.status] || {
              icon: <ClockFading className="text-gray-400" />,
              color: "text-gray-400",
            };

            return (
              <div
                key={item.id}
                className="flex flex-row justify-between p-3 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <div className="flex flex-col w-3/5">
                  <h2 className="text-black text-lg font-semibold">
                    Order #{item.id}
                  </h2>
                  <p className="text-sm text-black font-light pb-6">
                    {item.desc}
                  </p>
                  <div className="flex flex-row gap-2 items-center">
                    {status.icon}
                    <span
                      className={`text-sm font-semibold ${status.color}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-2/5 text-black text-right">
                  <p className="font-bold text-lg">Rp {item.price}</p>
                  <p className="text-sm">{item.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;
