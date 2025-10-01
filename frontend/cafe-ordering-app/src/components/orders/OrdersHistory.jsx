import LoadingSkeleton from "../common/LoadingSkeleton";
import EmptyState from "../common/EmptyState";
import OrderCard from "../common/OrderCard";
import { useOrders } from "../../hooks/useOrders";
import { formatDate } from "../../utils/orderUtils";

const OrdersHistory = () => {
  const { loading, getOrderHistory } = useOrders();
  const historyOrders = getOrderHistory();

  if (loading) {
    return (
      <div className="flex flex-col pb-10">
        <div className="border-b-2 border-gray-300">
          <h1 className="text-black text-xl font-semibold pb-4 pt-5 mx-5">
            Riwayat Pesanan
          </h1>
        </div>
        <LoadingSkeleton rows={3} />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-10">
      <div className="border-b-2 border-gray-300">
        <h1 className="text-black text-xl font-semibold pb-4 pt-5 mx-5">
          Riwayat Pesanan
        </h1>
      </div>
      {historyOrders.length === 0 ? (
        <div className="mt-20 mx-5">
          <EmptyState
            message="Riwayat pesanan kamu akan ditampilkan disini!"
          />
        </div>
      ) : (
        <div className="mx-5 mt-4 space-y-4">
          {historyOrders.map(order => (
            <div key={order._id} className="flex flex-row justify-between items-start p-3 border border-gray-200 rounded-xl shadow-sm bg-white">
              <div className="flex flex-col gap-2 text-black max-w-2/3">
                <h2 className="font-semibold">{formatDate(order.createdAt)}</h2>
                <p className="text-sm font-light">
                  {order.items.map((item) => (
                    <span key={item.menuId._id} className="mr-2">
                      {item.options && item.options.trim() !== "" 
                        ? item.options.charAt(0).toUpperCase() + item.options.slice(1) + " "
                        : ""
                      }{item.menuId.name} ({item.quantity})
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-1 flex-col text-right text-black">
                <p className="font-bold text-lg">
                  Rp {order.items.reduce((total, item) =>
                    total + item.menuId.price * item.quantity, 0
                  ).toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-gray-500">
                  {order.tableNumber === "Takeaway" ? "Takeaway" : `Dine in`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
