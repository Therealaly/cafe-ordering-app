import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onRemove, getItemTotal }) => {

  const optionDetail = () => {
    if(item.options != null && item.options !== "") {
      return `${item.name} (${item.options})`;
    }
    return item.name;
  }

  return (
    <div className="flex justify-between items-center border p-3 rounded-xl shadow-sm bg-white">
      <div className="flex gap-3 items-center min-w-2/3">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-black font-semibold">{optionDetail()}</h2>
          <p className="text-sm text-gray-600">
            {item.quantity} x Rp {item.price.toLocaleString()}
          </p>
        </div>
      </div>
      <p className="font-semibold text-green-800">
        Rp {getItemTotal(item).toLocaleString()}
      </p>
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 text-sm hover:text-red-700 transition-colors"
        aria-label={`Remove ${item.name} from cart`}
      > 
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
