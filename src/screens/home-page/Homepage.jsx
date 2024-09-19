import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import FoodDishes from '../../components/food-dishes/FoodDishes';
import TopRestaurants from '../../components/top-restaurants/TopRestaurants';
import { FOODITEMSIMGS, RESTAURANTIMGS } from './constants';
import { showLoader } from '../../store/loader/loaderSlice';

import './homePage-styles.css';
import { BASE_URL } from '../../config/constants';

const Homepage = ({ searchTerm }) => {
  const isLoading = useSelector((state) => state.loader.value);
  const dispatch = useDispatch();

  // console.log({ isLoading });

  const [dishes, setDishes] = useState([]);
  const fetchDishesData = async () => {
    dispatch(showLoader(true));
    const response = await axios.get(`${BASE_URL}food_items`);
    const formattedData = response.data.map((currValue, index) => {
      return {
        id: currValue.id,
        name: currValue.item,
        image: FOODITEMSIMGS[index],
      };
    });
    setDishes(formattedData);
    setTimeout(() => {
      dispatch(showLoader(false));
    }, 2000);
  };
  useEffect(() => {
    fetchDishesData();
  }, []);

  const [restaurant, setRestaurant] = useState([]);
  const fetchTopRestaurant = async () => {
    const serverData = await axios.get(`${BASE_URL}restaurants`);

    const transformedData = serverData.data.map((currValue, index) => ({
      id: currValue.id,
      name: currValue.name,
      image: RESTAURANTIMGS[index],
      rating: currValue.rating,
      min_time: currValue.min_time,
      max_time: currValue.max_time,
      type_of_food: currValue.type_of_food,
      city: currValue.city,
    }));

    setRestaurant(transformedData);
  };

  useEffect(() => {
    fetchTopRestaurant();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100  invisible-scrollbar">
      <div className="container mx-auto py-4 px-44">
        <FoodDishes dishes={dishes} />
        <hr />
        <TopRestaurants restaurant={restaurant} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Homepage;
