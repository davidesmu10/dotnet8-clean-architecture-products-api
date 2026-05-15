import api from "./api";
import type { Product } from "../types/Product";

/**
 * LISTAR productos (paginado)
 */
export const getProducts = async (
  pageNumber: number,
  pageSize: number
): Promise<Product[]> => {
  const response = await api.get("/ListadoProductos", {
    params: { pageNumber, pageSize }
  });

  return response.data;
};

/**
 * OBTENER producto por ID
 */
export const getProductById = async (
  id: number
): Promise<Product> => {
  const response = await api.get(`/${id}`);
  return response.data;
};

/**
 * CREAR producto
 */
export const createProduct = async (
  data: Product
): Promise<any> => {
  const response = await api.post("/CreacionProducto", data);
  return response.data;
};

/**
 * ACTUALIZAR producto
 */
export const updateProduct = async (
  id: number,
  data: Product
): Promise<any> => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

/**
 * ELIMINAR producto
 */
export const deleteProduct = async (
  id: number
): Promise<any> => {
  const response = await api.delete(`/${id}`);
  return response.data;
};