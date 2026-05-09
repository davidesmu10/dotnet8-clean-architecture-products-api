import api from "./api";
import type { Product } from "../types/Product";

export const getProducts = async (pageNumber: number, pageSize: number) => {
  const response = await api.get(
    `/ListadoProductos?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return response.data;
};

export const createProduct = async (data: Product) => {
  const response = await api.post("/CreacionProducto", data);
  return response.data;
};

export const updateProduct = async (id: number, data: Product) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};