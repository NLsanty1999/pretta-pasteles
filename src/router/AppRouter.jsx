import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/catalogo" element={<Catalog />} />

                <Route path="/producto/:id" element={<Product />} />

                <Route path="/carrito" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/admin" element={<Admin />} />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRouter;