import { ClockFading, CookingPot, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ActiveOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/order/user", 
      { headers: {
        Authorization: `Bearer ${token}` ,
      }}
    ) .then((response) => {
      setOrders(response.data);
      }
    ) .catch((error) => { 
        console.error("Error fetching orders:", error);
      });
  }, []);

  const activeOrders = orders.filter(order =>
    ["Menunggu Konfirmasi", "Disiapkan"].includes(order.status)
  );

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

        {activeOrders.length === 0 ? (
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
          activeOrders.map((order) => {
            const status = statusMap[order.status] || {
              icon: <ClockFading className="text-gray-400" />,
              color: "text-gray-400",
            };

            return (
              <div
                key={order._id}
                className="flex flex-row justify-between p-3 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <div className="flex flex-col w-3/5">
                  <h2 className="text-black text-lg font-semibold">
                    Order #{order._id}
                  </h2>
                  <p className="text-sm text-black font-light pb-6">
                    {order.items.map((item) => (
                      <span key={item.menuId._id} className="mr-2">
                        {item.menuId.name} ({item.quantity})
                      </span>
                    ))}
                  </p>
                  <div className="flex flex-row gap-2 orders-center">
                    {status.icon}
                    <span className={`text-sm font-semibold ${status.color}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-2/5 text-black text-right">
                  <p className="font-bold text-lg">Rp {" "}
                    {order.items.reduce((total, item) => 
                      total + item.menuId.price * item.quantity, 0
                    ).toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm">{order.createdAt}</p>
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
