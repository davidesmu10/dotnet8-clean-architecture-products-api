import type { Product } from "../types/Product";

type Props = {
  products: Product[];
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setSelectedProduct: (p: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({
  products,
  page,
  setPage,
  setSelectedProduct,
  onDelete
}: Props) {
  return (
    <div>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría ID</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.productID}>
              <td>{p.productID}</td>
              <td>{p.productName}</td>
              <td>{p.categoryID}</td>

              <td>
                <button onClick={() => setSelectedProduct(p)}>
                  Editar
                </button>

                <button onClick={() => onDelete(p.productID!)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Anterior
        </button>

        <span> Página {page} </span>

        <button onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}