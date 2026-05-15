import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";
import ProductTable from "../components/ProductTable";
import type { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const pageSize = 10;

  const load = async () => {
    const data = await getProducts(page, pageSize);
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, [page]);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Productos
          </h1>
          <p className="text-gray-500 text-sm">
            Gestión del catálogo de productos
          </p>
        </div>

        {/* BOTÓN CREAR */}
        <button
          onClick={() => navigate("/products/create")}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md"
        >
          + Crear producto
        </button>

      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-6">
        <ProductTable
          products={products}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          onDelete={handleDelete}
          onView={(p) => navigate(`/products/${p.productID}`)}
        />
      </div>

    </div>
  );
}