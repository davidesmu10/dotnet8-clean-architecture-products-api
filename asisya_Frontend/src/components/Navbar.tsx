import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-xl font-bold text-gray-800">
          Asisya <span className="text-blue-600">API</span>
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Inicio
          </Link>

          {isAuth && (
            <>
              <Link
                to="/products"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Productos
              </Link>

              <Link
                to="/categories/create"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Crear categoría
              </Link>
            </>
          )}

          {!isAuth ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
            >
              Salir
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}