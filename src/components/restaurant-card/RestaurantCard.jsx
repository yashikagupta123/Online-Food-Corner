import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = (props) => {
  const { restaurant } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/RestaurantPage/${restaurant.name}`, { state: restaurant });
  };

  return (
    <div
      key={restaurant.id}
      className="flex-none w-60 p-0 cursor-pointer hover:scale-[0.95] transition-[2s]"
      onClick={handleClick}
    >
      {/* Image Section */}
      {restaurant.image ? (
        <img
          src={restaurant.image} // Use the dynamically imported image
          alt={restaurant.name}
          className="w-full h-40 object-cover bg-white rounded-2xl "
        />
      ) : (
        <div className="w-full h-32 bg-gray-300 rounded-md mb-2 flex items-center justify-center text-gray-600">
          Image not found
        </div>
      )}

      {/* Name Section */}
      <p className="text-lg font-semibold text-center mb-1">
        {restaurant.name}
      </p>

      {/* Rating Section */}
      <div className="flex justify-center items-center mb-2">
        <span className="text-yellow-500 font-bold">{restaurant.rating}</span>
        <span className="ml-1 text-gray-500">⭐</span>
      </div>

      {/* Time Section */}
      <p className="text-sm text-gray-600 mb-2 mt-2">
        Delivery: {restaurant.min_time.slice(0, 2)} - {restaurant.max_time}
      </p>

      {/* Type of Food Section */}
      <div className="text-sm text-gray-600 mb-1">
        <strong>Type of Food:</strong>{' '}
        {restaurant.type_of_food.join(', ') || 'Not Specified'}
      </div>

      {/* City Section */}
      <p className="text-sm text-gray-600">
        <strong>City:</strong> {restaurant.city}
      </p>
    </div>
  );
};

export default RestaurantCard;
