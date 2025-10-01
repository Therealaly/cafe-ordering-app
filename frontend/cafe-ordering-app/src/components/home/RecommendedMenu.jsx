import LoadingSkeleton from "../common/LoadingSkeleton";
import { useRecommendations } from "../../hooks/useRecommendations";
import { getUser } from "../../utils/auth";

const RecommendedMenu = ({ onSelect }) => {
  const user = getUser();
  const { recommendations, loading } = useRecommendations(user?.id);
    
  return (
    <div className="flex flex-col space-y-2 h-fit">
      <div className="flex flex-col mx-5">
        <h1 className="text-black text-2xl font-semibold pb-1">
          Menu Rekomendasi
        </h1>
        <p className="text-black text-sm font-light pb-2">
          Pilihan menu menarik untukmu
        </p>
      </div>
      {/* scrollable Menu */}
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-5 pb-5 element">
        <div className="flex space-x-5 w-max">
          {loading
            ? [1, 2, 3, 4, 5, 6].map(idx => (
                <div
                  key={idx}
                  className="flex flex-col items-center animate-pulse"
                >
                  <div className="rounded-full h-24 w-24 bg-gray-200 mb-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              ))
            : recommendations.map(item => (
                <div 
                  key={item._id} 
                  onClick={() => onSelect(item)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="rounded-full h-24 w-24 object-cover"
                  />
                  <p className="text-sm text-black mt-2">{item.name}</p>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default RecommendedMenu;