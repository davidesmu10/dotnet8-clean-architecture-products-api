import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AuthGuard from "../components/AuthGuard";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/products"
          element={
            <AuthGuard>
              <Products />
            </AuthGuard>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}