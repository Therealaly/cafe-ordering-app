import { useState, useEffect } from "react";
import { ClockFading, CookingPot, CircleCheck, LogOut } from "lucide-react";
import { isLoggedIn, isKasir } from "../utils/auth";
import { formatId } from "../utils/orderUtils";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react"

const DashboardKasir = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedQrData, setGeneratedQrData] = useState("");

  useEffect(() => {
    if (!isLoggedIn() || !isKasir()) {
      navigate("/login");
    }
  }, [navigate]);

  const generateQrCode = async () => {
    const token = sessionStorage.getItem("token");

    if (!qrCode) return alert("Isi nomor meja terlebih dahulu");

    try {
      const res = await axios.post("http://localhost:5000/api/qrcode/generate", 
        { tableNumber: qrCode },
        { headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeneratedQrData(res.data.qrData);
      setShowModal(true);
    } catch (err) {
      console.error("Gagal generate QR Code:", err);
      alert("Terjadi kesalahan saat generate QR Code.");
    }
  };

  // fetching orders from the backend
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");

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
  
  const deleteOrder = async(orderId) => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/order/delete/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` },
      });

    fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  }

  // Function to sort orders by priority
  const sortOrdersByPriority = (orders) => {
    return orders.sort((a, b) => {
      // First priority: Status (Finished orders go to bottom)
      const statusPriority = {
        "Menunggu Konfirmasi": 1,
        "disiapkan": 2, 
        "Selesai": 3
      };
      
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      
      // If same status, sort by creation time (newest first)
      if (statusDiff === 0) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      return statusDiff;
    });
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg max-w-sm text-center space-y-4 items-center">
            <h3 className="text-lg font-semibold text-black">QR Code Meja</h3>
            <QRCodeSVG value={generatedQrData} size={300} />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-15 py-2 bg-red-700 text-white rounded hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-row justify-between items-center bg-green-950 p-6">
          <h1 className="text-2xl font-bold text-white">Dashboard Kasir</h1>
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
        <div className="px-6">
          <h2 className="text-lg font-semibold text-black mb-2">Generate QR Code</h2>
          <div className="flex flex-row gap-2 mb-4">
            <input className="border rounded-md border-gray-500 text-black" placeholder=" Input nomor meja" type="text" value={qrCode} onChange={(e) => setQrCode(e.target.value)}/>
            <button
              onClick={generateQrCode}
              className="ml-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-blue-600">
              Generate QR Code
            </button>
          </div>
          <h2 className="text-lg font-semibold text-black mb-2">Pesanan Masuk</h2>
          {orders.length === 0 || !orders.some(order => {
            const orderDate = new Date(order.createdAt);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return orderDate.getFullYear() === today.getFullYear() &&
                  orderDate.getMonth() === today.getMonth() &&
                  orderDate.getDate() === today.getDate();
          }) ? (
            <p className="text-gray-500">Belum ada pesanan masuk.</p>
          ) : (
            sortOrdersByPriority(
              orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return orderDate.getFullYear() === today.getFullYear() &&
                      orderDate.getMonth() === today.getMonth() &&
                      orderDate.getDate() === today.getDate();
              })
            ).map((order) => {
              const status = statusMap[order.status] || {
                icon: <ClockFading className="text-gray-400" />,
                color: "text-gray-400",
              };

              const nextStatus = getNextStatus(order.status);

              return (
                <div
                  key={order._id}
                  className={`p-4 rounded-xl border-4 shadow flex justify-between items-center mb-3 ${
                    order.status === "Selesai" 
                      ? "bg-green-50 border-green-200 opacity-75" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      Order #{formatId(order._id)} - Meja {order.tableNumber}
                    </h2>
                    <div className="text-sm text-black mb-2">
                      {order.items.map((item) => (
                        <div key={item.menuId._id} className="mb-1">
                          {`${item.quantity} `}
                          {item.menuId.name}
                          {item.options && item.options.trim() !== "" ? ` +${item.options.charAt(0).toUpperCase() + item.options.slice(1)}` : ""}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-black">
                      Total: Rp {" "}
                      {order.items.reduce((total, item) => 
                        total + item.menuId.price * item.quantity, 0
                      ).toLocaleString("id-ID")}
                    </p>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <div>
                    
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
                      {order.status === "Menunggu Konfirmasi" ? (
                      <button
                        onClick={() => {
                          if (window.confirm("Hapus pesanan ini?")) {
                            deleteOrder(order._id);
                          }
                        }}
                        className="ml-3 px-3 py-1 bg-red-600 text-white rounded-lg text-sm"
                      >
                        BATALKAN
                      </button>
                    ) : null }
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardKasir