import api from "./api";
import type { Category } from "../types/Category";

export const createCategory = async (
  data: Category
): Promise<any> => {
  const response = await api.post("/creacionCategoria", data);
  return response.data;
};