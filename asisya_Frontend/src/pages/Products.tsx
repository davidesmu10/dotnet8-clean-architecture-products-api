import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { deleteProduct, getProducts } from "../services/productService";
import ProductTable from "../components/ProductTable";
import type { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <div>
      <h2>Productos</h2>

      <ProductForm
        selectedProduct={selectedProduct}
        onSuccess={() => {
          setSelectedProduct(null);
          load();
        }}
      />

      <ProductTable
        products={products}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setSelectedProduct={setSelectedProduct}
        onDelete={handleDelete}
      />
    </div>
  );
}