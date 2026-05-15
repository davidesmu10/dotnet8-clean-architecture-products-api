import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../types/Product";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const data = await getProductById(Number(id));
        setProduct(data);
      }
    };

    load();
  }, [id]);

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
          {isEdit ? "Editar producto" : "Crear producto"}
        </h1>

        <p className="text-gray-500 text-sm">
          {isEdit
            ? "Modifica la información del producto"
            : "Registra un nuevo producto en el sistema"}
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <ProductForm
          selectedProduct={product}
          onSuccess={() => navigate("/products")}
        />
      </div>

    </div>
  );
}