const express = require('express');
const router = express.Router();

const ROUTES ={
  BASE_API: '/api/v1',
  FOOD_ITEMS: '/food_items'
}

router.get('/', (req, res) => {
  console.log('Welcome');
  res.send('Welcome');
});

const FoodItemsControllers = require('../src/controllers/FoodItems');
const RestaurantsControllers = require('../src/controllers/Restaurants');
const OrdersController = require('../src/controllers/Orders');

router.get('/api/v1/food_items', FoodItemsControllers.getFoodItems);
router.get('/api/v1/restaurants', RestaurantsControllers.getRestaurants);
router.get('/api/v1/orders', OrdersController.getOrders);
router.get('/api/v1/restaurant_id/menu', RestaurantsControllers.getMenuByRestaurantId);

router.post('/api/v1/post_orders', OrdersController.postOrder);

router.delete('/api/v1/delete_orders', OrdersController.deleteOrder);



module.exports = router;
