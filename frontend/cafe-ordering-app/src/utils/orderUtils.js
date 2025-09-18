// Order-related utility functions

// Format date for Indonesian locale
export const formatDate = (dateString) => {
  const options = { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

export const formatTime = (dateString) => {
  const options = { 
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleTimeString("id-ID", options);
}

export const formatId = (id) => {
  const num = id.slice(-3);
  
  return num.toUpperCase();
}

// Format currency for Indonesian Rupiah
export const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID");
};

// Order status configurations
export const ORDER_STATUS = {
  PENDING: "Menunggu Konfirmasi",
  PREPARING: "disiapkan",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

// Order status display configurations
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: "ClockFading",
  },
  [ORDER_STATUS.PREPARING]: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    icon: "CookingPot",
  },
  [ORDER_STATUS.COMPLETED]: {
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: "CircleCheck",
  },
  [ORDER_STATUS.CANCELLED]: {
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: "XCircle",
  },
};

// Calculate order total
export const calculateOrderTotal = (order) => {
  if (!order?.items) return 0;
  return order.items.reduce((total, item) => 
    total + (item.menuId?.price || 0) * item.quantity, 0
  );
};

// Get order items summary text
export const getOrderItemsSummary = (order) => {
  if (!order?.items) return "";
  return order.items.map(item => 
    `${item.menuId?.name || 'Unknown'} (${item.quantity})`
  ).join(", ");
};

// Check if order is active
export const isActiveOrder = (status) => {
  return [ORDER_STATUS.PENDING, ORDER_STATUS.PREPARING].includes(status);
};

// Check if order is completed
export const isCompletedOrder = (status) => {
  return status === ORDER_STATUS.COMPLETED;
};
