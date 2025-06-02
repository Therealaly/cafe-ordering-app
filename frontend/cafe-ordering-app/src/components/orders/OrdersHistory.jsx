import {useState, useEffect} from "react";
import axios from "axios";

const OrdersHistory = () => {

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

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
  
    const history = orders.filter(order =>
      ["Selesai"].includes(order.status)
    );


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
        history.map(order => (
          <div key={order._id} className="flex flex-row justify-between items-start px-5 py-3 mb-4 border border-gray-200 shadow-md bg-white">
            <div className="flex flex-col gap-2 text-black">
              <h2 className="font-semibold">{formatDate(order.createdAt)}</h2>
              <p className="text-sm font-light">
                {order.items.map((item) => (
                  <span key={item.menuId._id} className="mr-2">
                    {item.menuId.name} ({item.quantity})
                  </span>
                ))}
              </p>
            </div>
            <div className="flex gap-1 flex-col text-right text-black">
              <p className="font-bold text-lg">Rp{" "}
                {order.items.reduce((total, item) =>
                  total + item.menuId.price * item.quantity, 0
                ).toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500">
                {order.tableNumber === "Takeaway" ? "Takeaway" : `Dine in`}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersHistory;
