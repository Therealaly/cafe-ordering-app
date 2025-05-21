import { useState } from "react";
import { ClockFading, CookingPot, CircleCheck } from "lucide-react";

const DashboardKasir = () => {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("pendingOrders")) || []
  });

  const updateStatus = (id, nextStatus) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: nextStatus } : order
    );

    setOrders(updated);
    localStorage.setItem("pendingOrders", JSON.stringify(updated));
  };


  const getNextStatus = (status) => {
    if (status === "Menunggu Konfirmasi") return "disiapkan";
    if (status === "disiapkan") return "Selesai";
    return null;
  };

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
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-black">Dashboard Kasir</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan masuk.</p>
      ) : (
        orders.map((order) => {
          const status = statusMap[order.status] || {
            icon: <ClockFading className="text-gray-400" />,
            color: "text-gray-400",
          };

          const nextStatus = getNextStatus(order.status);

          return (
            <div
              key={order.id}
              className="p-4 rounded-xl bg-white border shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold text-black">
                  Order #{order.id} - Meja {order.table}
                </h2>
                <p className="text-sm text-black mb-2">{order.desc}</p>
                <p className="text-sm font-semibold text-black">
                  Total: Rp {order.price}
                </p>
                <p className="text-sm text-gray-500">{order.time}</p>
              </div>

              <div className="text-right space-y-2">
                <div className="flex justify-end items-center gap-2">
                  {status.icon}
                  <span className={`font-medium ${status.color}`}>
                    {order.status}
                  </span>
                </div>
                {nextStatus && (
                  <button
                    onClick={() => updateStatus(order.id, nextStatus)}
                    className="px-3 py-1 bg-green-700 text-white rounded-lg text-sm"
                  >
                    Tandai: {nextStatus}
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DashboardKasir