import OrderStatusIcon from "../common/OrderStatusIcon";
import { formatCurrency, getOrderItemsSummary, calculateOrderTotal } from "../../utils/orderUtils";

const OrderCard = ({ order, showDate = false }) => {
  return (
    <div className="flex flex-row justify-between p-3 border border-gray-200 rounded-xl shadow-sm bg-white">
      <div className="flex flex-col w-3/5">
        <h2 className="text-black text-lg font-semibold">
          Order #{order._id}
        </h2>
        <p className="text-sm text-black font-light pb-6">
          {getOrderItemsSummary(order)}
        </p>
        <OrderStatusIcon status={order.status} />
      </div>
      <div className="flex flex-col w-2/5 text-black text-right">
        <p className="font-bold text-lg">
          Rp {formatCurrency(calculateOrderTotal(order))}
        </p>
        {showDate && (
          <p className="text-sm">{order.createdAt}</p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
