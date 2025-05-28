import { useState, useEffect } from "react";
import { ClockFading, CookingPot, CircleCheck, LogOut } from "lucide-react";
import { isLoggedIn, isKasir } from "../utils/auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const DashboardKasir = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn() || !isKasir()) {
      navigate("/login");
    }
  }, [navigate]);

  // fetching orders from the backend
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/order/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched orders:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async(orderId, status) => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(`http://localhost:5000/api/order/${orderId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` },
      });

    fetchOrders();
    } catch (error) {
      console.error("Error update status order:", error);
  }};

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Dashboard Kasir</h1>
        <button
          className="flex flex-row items-center justify-between p-3 shadow-sm bg-red-800 hover:bg-gray-50 transition text-left rounded-md"
          onClick={handleLogout}
          type="button"
        >
          <div className="flex flex-row items-center gap-3">
            <LogOut className="text-white" />
            <span className="text-base font-medium text-white">
              Log out Kasir
            </span>
          </div>
        </button>
      </div>

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
              key={order._id}
              className="p-4 rounded-xl bg-gray-50 border-4 shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold text-black">
                  Order #{order._id} - Meja {order.tableNumber}
                </h2>
                <p className="text-sm text-black mb-2">
                  {order.items.map((item) => (
                    <span key={item.menuId._id} className="mr-2">
                      {item.menuId.name} ({item.quantity})
                    </span>
                  ))}
                </p>
                <p className="text-sm font-semibold text-black">
                  Total: Rp {" "}
                  {order.items.reduce((total, item) => 
                    total + item.menuId.price * item.quantity, 0
                  ).toLocaleString("id-ID")}
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
                    onClick={() => {
                      if (window.confirm(`Tandai pesanan ini sebagai ${nextStatus}?`)) {
                        updateStatus(order._id, nextStatus);
                      }
                    }}
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