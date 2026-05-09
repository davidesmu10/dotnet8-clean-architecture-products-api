import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/productService";
import type { Product } from "../types/Product";

type Props = {
  selectedProduct: Product | null;
  onSuccess: () => void;
};

const emptyProduct: Product = {
  productName: "",
  supplierID: 1,
  categoryID: 1,
  quantityPerUnit: "",
  unitPrice: 0,
  unitsInStock: 0,
  unitsOnOrder: 0,
  reorderLevel: 0,
  discontinued: false
};

export default function ProductForm({ selectedProduct, onSuccess }: Props) {
  const [form, setForm] = useState<Product>(emptyProduct);

  useEffect(() => {
    if (selectedProduct) setForm(selectedProduct);
    else setForm(emptyProduct);
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "supplierID" ||
        name === "categoryID" ||
        name === "unitPrice" ||
        name === "unitsInStock" ||
        name === "unitsOnOrder" ||
        name === "reorderLevel"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.productID) {
      await updateProduct(form.productID, form);
    } else {
      await createProduct(form);
    }

    setForm(emptyProduct);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "8px" }}>

      <input
        name="productName"
        placeholder="Nombre"
        value={form.productName}
        onChange={handleChange}
      />

      <input
        name="supplierID"
        type="number"
        placeholder="Supplier ID"
        value={form.supplierID}
        onChange={handleChange}
      />

      <input
        name="categoryID"
        type="number"
        placeholder="Category ID"
        value={form.categoryID}
        onChange={handleChange}
      />

      <input
        name="quantityPerUnit"
        placeholder="Cantidad por unidad"
        value={form.quantityPerUnit}
        onChange={handleChange}
      />

      <input
        name="unitPrice"
        type="number"
        placeholder="Precio"
        value={form.unitPrice}
        onChange={handleChange}
      />

      <input
        name="unitsInStock"
        type="number"
        placeholder="Stock"
        value={form.unitsInStock}
        onChange={handleChange}
      />

      <input
        name="unitsOnOrder"
        type="number"
        placeholder="En orden"
        value={form.unitsOnOrder}
        onChange={handleChange}
      />

      <input
        name="reorderLevel"
        type="number"
        placeholder="Reorden"
        value={form.reorderLevel}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="discontinued"
          checked={form.discontinued}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              discontinued: e.target.checked
            }))
          }
        />
        Discontinued
      </label>

      <button type="submit">
        {form.productID ? "Actualizar" : "Crear"}
      </button>

    </form>
  );
}