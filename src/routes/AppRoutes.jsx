import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import Layout from "../components/layout/Layout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/restaurant/:id"
                        element={<Restaurant />}
                    />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}