import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

export default function CreateCategory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">

        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 text-sm hover:underline"
        >
          ← Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          Crear categoría
        </h1>

        <p className="text-gray-500 text-sm">
          Registra una nueva categoría en el sistema
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <CategoryForm onSuccess={() => navigate("/products")} />
      </div>

    </div>
  );
}