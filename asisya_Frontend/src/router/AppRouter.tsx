import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";
import CreateProduct from "../pages/CreateProduct";

import CreateCategory from "../pages/CreateCategory";

import AuthGuard from "../components/AuthGuard";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={
            <AuthGuard>
              <ProductList />
            </AuthGuard>
          }
        />

        <Route
          path="/products/create"
          element={
            <AuthGuard>
              <CreateProduct />
            </AuthGuard>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <AuthGuard>
              <CreateProduct />
            </AuthGuard>
          }
        />

        <Route
          path="/products/:id"
          element={
            <AuthGuard>
              <ProductDetail />
            </AuthGuard>
          }
        />

        {/* CATEGORIES */}
        <Route
          path="/categories/create"
          element={
            <AuthGuard>
              <CreateCategory />
            </AuthGuard>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}