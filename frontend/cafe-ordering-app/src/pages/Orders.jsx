import ActiveOrders from "../components/orders/ActiveOrders"
import OrdersHistory from "../components/orders/OrdersHistory"

const Orders = () => {
  return (
    <div className="pt-20 left-0 right-0 py-4 space-y-3">
      <ActiveOrders />
      <OrdersHistory />
    </div>
  );
}
export default Orders;