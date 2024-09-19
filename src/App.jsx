import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';

import Homepage from './screens/home-page/Homepage';
import Navbar from './components/navbar/Navbar';
import CartPage from './screens/cart-page/CartPage';
import RestaurantPage from './screens/restaurant-page/RestaurantPage';
import SignInPage from './screens/signInPage/SignInPage';
import './App.css';

import OrdersPage from './screens/orders-page/OrdersPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const ProtectRoute = ({ ele }) => {
    return isAuthenticated ? ele : <Navigate to="/" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage handleLogin={handleLogin} />} />
      </Routes>
      <Navbar
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="main-content pt-24">
        <Routes>
          <Route
            path="/HomePage"
            element={
              <ProtectRoute ele={<Homepage searchTerm={searchTerm} />} />
            }
          />
          <Route
            path="/CartPage"
            element={<ProtectRoute ele={<CartPage />} />}
          />
          <Route
            path="/RestaurantPage/:restaurantName"
            element={<ProtectRoute ele={<RestaurantPage />} />}
          />
          <Route
            path="/OrdersPage"
            element={<ProtectRoute ele={<OrdersPage />} />}
          ></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
