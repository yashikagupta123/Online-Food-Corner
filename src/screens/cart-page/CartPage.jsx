import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../../store/cart/cartSlice';
import axios from 'axios';
import { BASE_URL } from '../../config/constants';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.value);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const renderFoods = () => {
    const cartFoods = [];
    let key = 1;
    for (let i in cartData) {
      cartFoods.push(
        <div
          key={key++}
          className="flex flex-row justify-between items-center my-2"
        >
          {/* Food Item Name */}
          <p>{i}</p>

          {/* Quantity Controls */}
          <div className="flex flex-row items-center">
            <button
              onClick={() => dispatch(removeFromCart(i))}
              className="px-2 py-1 bg-gray-300 text-black"
            >
              -
            </button>
            <span className="mx-2">{cartData[i]}</span>
            <button
              onClick={() => dispatch(addToCart(i))}
              className="px-2 py-1 bg-gray-300 text-black"
            >
              +
            </button>
          </div>
        </div>
      );
    }
    return cartFoods;
  };

  const getFoodsFromCart = () => {
    let result = [];
    for (let key in cartData) {
      const obj = {
        item: key,
        quantity: cartData[key],
      };
      result.push(obj);
    }
    return result;
  };

  // const placeOrder = async () => {
  //   const response = await axios.post(`${BASE_URL}post_orders`, {
  //     food_items: getFoodsFromCart(),
  //   });
  //   setOrderPlaced(true);

  //   dispatch(clearCart());

  //   setTimeout(() => {
  //     setOrderPlaced(false);
  //   }, 1500);
  // };
  // const handleCheckoutClick = () => {
  //   placeOrder();
  // };
  const placeOrder = async () => {
    try {
      const response = await axios.post(`${BASE_URL}post_orders`, {
        food_items: getFoodsFromCart(),
      });

      if (response.status === 201) {
        // Ensure the order is successfully placed
        setOrderPlaced(true);

        dispatch(clearCart()); // Clear the cart after a successful order

        // Optionally, add any success confirmation timeout or logic
        setTimeout(() => {
          setOrderPlaced(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Order placement failed:', error);
      // You can handle the error here if necessary (e.g., show a message)
    }
  };
  const handleCheckoutClick = () => {
    placeOrder();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border border-gray-500 p-4 rounded-2xl shadow-xl mt-6 w-[50%] mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="flex flex-col text-gray-600 text-lg">
          {renderFoods().length > 0 ? (
            renderFoods()
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
      <button
        onClick={handleCheckoutClick}
        className="bg-blue-600 text-white rounded-md text-lg border border-solid border-white w-[8%] mt-6 cursor-pointer hover:scale-[1.05] duration-700 transition-all"
      >
        Checkout
      </button>
      {orderPlaced && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Your Order Has Been Placed !
        </Alert>
      )}
    </div>
  );
};

export default CartPage;
