import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  products: Product[];
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  onDelete: (id: number) => void;
  onView?: (p: Product) => void;
};

export default function ProductTable({
  products,
  page,
  setPage,
  onDelete,
  onView
}: Props) {

  const navigate = useNavigate();

  return (
    <div className="w-full">

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full bg-white">

          {/* HEADER */}
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {products.map((p) => (
              <tr
                key={p.productID}
                className="hover:bg-gray-50 transition"
              >

                <td className="px-4 py-3 text-gray-700">
                  {p.productID}
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {p.productName}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {p.categoryID}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">

                    {/* VIEW */}
                    <button
                      onClick={() => onView?.(p) ?? navigate(`/products/${p.productID}`)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      Ver
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => navigate(`/products/edit/${p.productID}`)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Editar
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => onDelete(p.productID!)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          ← Anterior
        </button>

        <span className="text-sm text-gray-600">
          Página <span className="font-medium">{page}</span>
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
        >
          Siguiente →
        </button>

      </div>

    </div>
  );
}