import { useState } from "react";
import { createCategory } from "../services/categoryService";
import type { Category } from "../types/Category";

type Props = {
  onSuccess: () => void;
};

const emptyCategory: Category = {
  categoryName: "",
  description: "",
  picture: ""
};

export default function CategoryForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Category>(emptyCategory);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.categoryName.trim())
      err.categoryName = "El nombre es obligatorio";

    if (!form.description.trim())
      err.description = "La descripción es obligatoria";

    if (!form.picture.trim())
      err.picture = "La imagen es obligatoria";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    const res = await createCategory(form);

    console.log("RESPUESTA BACKEND:", res);

    alert("Categoría creada OK");

    setForm(emptyCategory);
    onSuccess();

  } catch (error: any) {
    console.log("ERROR FRONT:", error);

    console.log("ERROR RESPONSE:", error.response?.data);

    alert(error.response?.data?.message || "Error inesperado");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* NOMBRE */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">Nombre categoría</label>
        <input
          name="categoryName"
          value={form.categoryName}
          onChange={handleChange}
          placeholder="Ej: Electrónica"
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.categoryName && (
          <span className="text-xs text-red-500">
            {errors.categoryName}
          </span>
        )}
      </div>

      {/* DESCRIPCIÓN */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe la categoría"
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description}
          </span>
        )}
      </div>

      {/* IMAGEN */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-sm text-gray-700">URL Imagen</label>
        <input
          name="picture"
          value={form.picture}
          onChange={handleChange}
          placeholder="https://..."
          className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.picture && (
          <span className="text-xs text-red-500">
            {errors.picture}
          </span>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Crear categoría"}
      </button>
    </form>
  );
}