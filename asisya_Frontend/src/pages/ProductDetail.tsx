import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../types/Product";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const Info = ({ label, value }: any) => (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 text-sm hover:underline"
        >
          ← Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          {product.productName}
        </h1>

        <p className="text-gray-500 text-sm">
          Información completa del producto
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
          <img
            src={
              product.picture
                ? `/images/${product.picture}`
                : "https://via.placeholder.com/200"
            }
            alt={product.productName}
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* INFO */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Info label="ID Producto" value={product.productID} />
            <Info label="Nombre" value={product.productName} />
            <Info label="Categoría ID" value={product.categoryID} />
            <Info label="Categoría" value={product.categoryName} />
            <Info label="Proveedor ID" value={product.supplierID} />
            <Info label="Cantidad por unidad" value={product.quantityPerUnit} />
            <Info label="Precio unitario" value={`$${product.unitPrice}`} />
            <Info label="Stock" value={product.unitsInStock} />
            <Info label="En orden" value={product.unitsOnOrder} />
            <Info label="Nivel reorden" value={product.reorderLevel} />

          </div>

          {/* STATUS */}
          <div className="mt-5">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                product.discontinued
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {product.discontinued ? "Descontinuado" : "Activo"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}