import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/productDetails";   // note: lowercase p
import Login from "./pages/Login";
import Signup from "./pages/signUp";                   // note: lowercase s, uppercase U
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Wishlist from "./pages/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default AppRoutes;