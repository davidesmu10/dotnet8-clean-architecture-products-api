using asisya_api.DTOs;
using asisya_api.Models;

namespace asisya_api.Interfaces
{
    public interface IProductData
    {
        List<ProductModel> ObtenerListadoProductos(ProductFilterDto filter);

        ProductModel ObtenerProductoPorId(int id);

        int CrearProducto(ProductModel producto);

        bool ActualizarProducto(int id, ProductModel producto);

        bool EliminarProducto(int id);

        Task<bool> BulkInsertProducts(int quantity);
    }
}