
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import RestaurantDetails from "../features/restaurantDetails/RestaurantDetails";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";

import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ==========================================
                    PUBLIC ROUTES
                ========================================== */}

                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<Restaurant />} />
                    <Route
                        path="/restaurant/:id"
                        element={<RestaurantDetails />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                    />
                </Route>


                {/* ==========================================
                    PROTECTED ROUTES
                ========================================== */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/orders"
                            element={<Orders />}
                        />

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />

                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

