import axios from 'axios';
import { BASE_URL } from '../../config/constants';
import { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrdersData = async () => {
    const response = await axios.get(`${BASE_URL}orders
 `);
    setOrders(response.data);
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const renderOrders = () => {
    const result = [];
    orders.forEach((currentValue, index) => {
      const foods = [];
      currentValue.food_items.forEach((currVal, idx) => {
        const component = (
          <div key={`${index}-${idx}`} className="flex flex-row gap-x-4">
            <p>{currVal.item}</p>
            <p>x</p>
            <p>{currVal.quantity}</p>
          </div>
        );
        foods.push(component);
      });
      result.push(
        <div key={index} className="mb-4">
          <p className="font-bold mb-2">Order {index + 1}</p>
          {foods}
          <hr />
        </div>
      );
    });
    return result;
  };
  return (
    <div className="border border-gray-500 p-4 rounded-2xl shadow-xl mt-6 w-[50%] mx-auto">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      <div className="my-8">{renderOrders()}</div>
    </div>
  );
};

export default OrdersPage;
