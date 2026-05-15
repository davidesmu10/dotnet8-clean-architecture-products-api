import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !passwordHash) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await login({
        username,
        passwordHash
      });

      localStorage.setItem("token", res.token);

      navigate("/products");

    } catch (error) {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenido
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Inicia sesión para continuar
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* INPUT USER */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Usuario</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Contraseña</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

      </div>

    </div>
  );
}