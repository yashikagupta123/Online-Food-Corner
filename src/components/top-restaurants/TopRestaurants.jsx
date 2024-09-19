import React from 'react';
import RestaurantCard from '../restaurant-card/RestaurantCard';

const TopRestaurants = ({ restaurant, searchTerm }) => {
  // Filter restaurants based on search term
  const filteredRestaurants = restaurant.filter(
    (restaurantItem) =>
      restaurantItem.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurantItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurantItem.type_of_food
        .join(', ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-8">
      <p className="text-2xl font-bold mb-4">Top Restaurants in Delhi</p>
      <div className="flex flex-row flex-wrap gap-[30px] w-[100%] justify-center">
        {filteredRestaurants.map((restaurantItem, index) => (
          <RestaurantCard key={index} restaurant={restaurantItem} />
        ))}
      </div>
    </div>
  );
};

export default TopRestaurants;
