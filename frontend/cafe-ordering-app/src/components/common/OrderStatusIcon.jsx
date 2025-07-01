import { ClockFading, CookingPot, CircleCheck } from "lucide-react";
import { ORDER_STATUS_CONFIG } from "../../utils/orderUtils";

const OrderStatusIcon = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG["Menunggu Konfirmasi"];
  
  const iconMap = {
    ClockFading: <ClockFading className={config.color} />,
    CookingPot: <CookingPot className={config.color} />,
    CircleCheck: <CircleCheck className={config.color} />,
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {iconMap[config.icon]}
      <span className={`text-sm font-semibold ${config.color}`}>
        {status}
      </span>
    </div>
  );
};

export default OrderStatusIcon;
