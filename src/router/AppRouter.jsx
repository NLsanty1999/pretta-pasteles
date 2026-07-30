import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Category from "../pages/Category";
import CategoryProducts from "../pages/CategoryProducts";
import AdminProducts from "../pages/AdminProducts";
import TraditionalProduct from "../pages/TraditionalProduct";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/catalogo" element={<Catalog />} />

                <Route
                    path="/categoria/:category"
                    element={<Category />}
                />

                <Route
                    path="/categoria/:category/productos"
                    element={<CategoryProducts />}
                />

                <Route

                    path="/admin/productos"

                    element={<AdminProducts />}

                />

                <Route

                    path="/catalogo/:category"

                    element={<Catalog />}

                />

                <Route
                    path="/producto/tradicional/:slug"
                    element={<TraditionalProduct />}
                />

                <Route path="/producto/:id" element={<Product />} />

                <Route path="/carrito" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRouter;