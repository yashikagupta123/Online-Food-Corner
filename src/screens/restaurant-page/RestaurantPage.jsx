import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../store/cart/cartSlice';
import { BASE_URL } from '../../config/constants';

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.value);

  console.log('Cart Data: ', cartData);

  const navProps = useLocation();
  const { id, name, rating, min_time, max_time, type_of_food, city } =
    navProps.state;
  const [restaurant, setRestaurant] = useState([]);
  const fetchRestaurantData = async () => {
    const serverData = await axios.get(
      `${BASE_URL}restaurant_id/menu?id=${id}`
    );

    const formattedData = {};
    for (let i in serverData.data) {
      formattedData[i] = serverData.data[i].map((item) => {
        return { ...item, counter: 0 };
      });
    }

    setRestaurant(formattedData);
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const renderMenu = () => {
    const getFood = (foodsData) => {
      const foods = foodsData.map((element, index) => {
        const { item_name, price } = element;

        return (
          <div key={index}>
            <div className="flex flex-row justify-between items-center ">
              <div>
                <p>{item_name}</p>
                <p>₹ {price}</p>
              </div>
              <div>
                <div className="flex justify-center cursor-pointer items-center flex-row border border-gray-500 h-8 w-24">
                  {cartData[item_name] ? (
                    <div className="flex flex-row h-full">
                      <button
                        onClick={() => {
                          dispatch(removeFromCart(foodsData[index].item_name));
                        }}
                        className="flex justify-center items-center bg-slate-400 text-black w-8"
                      >
                        -
                      </button>
                      <div className="flex justify-center items-center w-8">
                        {cartData[item_name]}
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart(foodsData[index].item_name));
                        }}
                        className="flex justify-center items-center bg-slate-500 text-black w-8"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p
                      onClick={() => {
                        dispatch(addToCart(foodsData[index].item_name));
                      }}
                      className="flex justify-center items-center w-full h-full  "
                    >
                      Add
                    </p>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      });
      return foods;
    };

    const arrayToBeRendered = [];
    for (let i in restaurant) {
      const component = (
        <div key={i}>
          <p className="text-2xl font-bold mb-4">
            {i} ({restaurant[i].length})
          </p>
          <hr className="w-[15%] border h-0.5 bg-gray-300 mt-[-5px]" />
          <div className="flex flex-col flex-wrap gap-[30px] w-[100%] justify-center my-3">
            {getFood(restaurant[i], i)}
          </div>
        </div>
      );
      arrayToBeRendered.push(component);
    }

    return arrayToBeRendered;
  };

  return (
    <div className="px-[30%] mt-6">
      <p className="font-bold text-2xl">{name}</p>
      <div className="border border-gray-500 p-4 rounded-2xl shadow-xl mt-6">
        <p>
          <span className="text-gray-600 text-lg mr-3">Rating:</span> {rating}
        </p>
        <p>
          <span className="text-gray-600 text-lg mr-3">Delivery:</span>
          {min_time.slice(0, 2)} - {max_time}
        </p>
        <p>
          <span className="text-gray-600 text-lg mr-3">Type of food:</span>
          {type_of_food}
        </p>
        <p>
          <span className="text-gray-600 text-lg mr-3">City:</span> {city}
        </p>
      </div>
      <div className="my-8">{renderMenu()}</div>
    </div>
  );
};

export default RestaurantPage;
