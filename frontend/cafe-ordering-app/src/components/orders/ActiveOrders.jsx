import LoadingSkeleton from "../common/LoadingSkeleton";
import EmptyState from "../common/EmptyState";
import OrderCard from "../common/OrderCard";
import { useOrders } from "../../hooks/useOrders";

const ActiveOrders = () => {
  const { loading, getActiveOrders } = useOrders();
  const activeOrders = getActiveOrders();

  return (
    <div className="w-full min-h-5">
      <div className="flex flex-col mx-5 space-y-3">
        <h1 className="text-black text-xl font-semibold pb-1 pt-5">
          Pesanan Saya
        </h1>
        {loading ? (
          <LoadingSkeleton rows={3} />
        ) : activeOrders.length === 0 ? (
          <EmptyState
            message="Belum ada pesanan aktif, yuk pesan dulu!"
            actionText="Pesan sekarang"
            actionLink="/"
          />
        ) : (
          activeOrders.map((order) => (
            <OrderCard 
              key={order._id} 
              order={order} 
              showDate={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;
