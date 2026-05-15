import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/productService";
import type { Product } from "../types/Product";

type Props = {
  selectedProduct: Product | null;
  onSuccess: () => void;
};

const emptyProduct: Product = {
  productName: "",
  supplierID: 0,
  categoryID: 0,
  quantityPerUnit: "",
  unitPrice: 0,
  unitsInStock: 0,
  unitsOnOrder: 0,
  reorderLevel: 0,
  discontinued: false,
  supplierName: undefined,
  categoryName: undefined,
  picture: undefined
};

/* INPUT COMPONENT FUERA (EVITA RE-RENDER Y PÉRDIDA DE FOCO) */
function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 rounded-xl border border-gray-200 
                   focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

export default function ProductForm({ selectedProduct, onSuccess }: Props) {
  const [form, setForm] = useState<Product>(emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(selectedProduct ?? emptyProduct);
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : [
              "supplierID",
              "categoryID",
              "unitPrice",
              "unitsInStock",
              "unitsOnOrder",
              "reorderLevel"
            ].includes(name)
          ? Number(value)
          : value
    }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.productName.trim()) err.productName = "Nombre obligatorio";
    if (form.supplierID <= 0) err.supplierID = "Supplier ID inválido";
    if (form.categoryID <= 0) err.categoryID = "Category ID inválido";
    if (!form.quantityPerUnit.trim()) err.quantityPerUnit = "Requerido";
    if (form.unitPrice <= 0) err.unitPrice = "Precio inválido";
    if (form.unitsInStock < 0) err.unitsInStock = "Stock inválido";
    if (form.unitsOnOrder < 0) err.unitsOnOrder = "No válido";
    if (form.reorderLevel < 0) err.reorderLevel = "No válido";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      if (form.productID) {
        await updateProduct(form.productID, form);
      } else {
        await createProduct(form);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <Input
        label="Nombre del producto"
        name="productName"
        value={form.productName}
        onChange={handleChange}
        error={errors.productName}
        placeholder="Ej: Laptop Dell"
      />

      <Input
        label="Cantidad por unidad"
        name="quantityPerUnit"
        value={form.quantityPerUnit}
        onChange={handleChange}
        error={errors.quantityPerUnit}
        placeholder="Ej: 10 cajas x 20"
      />

      <Input
        label="Supplier ID"
        name="supplierID"
        type="number"
        value={form.supplierID}
        onChange={handleChange}
        error={errors.supplierID}
      />

      <Input
        label="Category ID"
        name="categoryID"
        type="number"
        value={form.categoryID}
        onChange={handleChange}
        error={errors.categoryID}
      />

      <Input
        label="Precio unitario"
        name="unitPrice"
        type="number"
        value={form.unitPrice}
        onChange={handleChange}
        error={errors.unitPrice}
      />

      <Input
        label="Unidades en stock"
        name="unitsInStock"
        type="number"
        value={form.unitsInStock}
        onChange={handleChange}
        error={errors.unitsInStock}
      />

      <Input
        label="Unidades en orden"
        name="unitsOnOrder"
        type="number"
        value={form.unitsOnOrder}
        onChange={handleChange}
        error={errors.unitsOnOrder}
      />

      <Input
        label="Nivel de reorden"
        name="reorderLevel"
        type="number"
        value={form.reorderLevel}
        onChange={handleChange}
        error={errors.reorderLevel}
      />

      {/* CHECKBOX */}
      <div className="col-span-2 flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="discontinued"
          checked={form.discontinued}
          onChange={handleChange}
          className="w-4 h-4 accent-blue-600"
        />
        <label className="text-sm text-gray-600">
          Producto descontinuado
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="col-span-2 bg-blue-600 text-white py-3 rounded-xl 
                   hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading
          ? "Guardando..."
          : form.productID
          ? "Actualizar producto"
          : "Crear producto"}
      </button>
    </form>
  );
}