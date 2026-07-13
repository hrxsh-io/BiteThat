import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import RestaurantDetails from "../features/restaurantDetails/RestaurantDetails";

import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar & Footer */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Restaurant Listing */}
          <Route
            path="/restaurants"
            element={<Restaurant />}
          />

          {/* Restaurant Details */}
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetails />}
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}