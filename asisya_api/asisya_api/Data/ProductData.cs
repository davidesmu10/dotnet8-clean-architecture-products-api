using asisya_api.DTOs;
using asisya_api.Helpers;
using asisya_api.Interfaces;
using asisya_api.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace asisya_api.Data
{
    public class ProductData : IProductData
    {



        LeerConfiguraciones objJson = new();
        string strConexionSQL = "";

        public ProductData()
        {
            strConexionSQL = objJson.GetStrConexion();
        }

        // obtener listado de productos
        public List<ProductModel> ObtenerListadoProductos(ProductFilterDto filter)
        {
            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataSet ds = new DataSet();
            List<ProductModel> lista = new List<ProductModel>();

            try
            {
                SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandTimeout = 10000;
                comandoSQL.CommandText = "sp_ListadoProductos";
                comandoSQL.Parameters.Clear();
                comandoSQL.Parameters.AddWithValue("@ProductName", filter.ProductName);
                comandoSQL.Parameters.AddWithValue("@CategoryName", filter.CategoryName);
                comandoSQL.Parameters.AddWithValue("@SupplierID", filter.SupplierID);
                comandoSQL.Parameters.AddWithValue("@Discontinued", filter.Discontinued);
                comandoSQL.Parameters.AddWithValue("@PageNumber", filter.PageNumber);
                comandoSQL.Parameters.AddWithValue("@PageSize", filter.PageSize);
                adaptador.SelectCommand = comandoSQL;
                adaptador.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        lista.Add(new ProductModel
                        {
                            ProductID = Convert.ToInt32(row["ProductID"]),
                            ProductName = row["ProductName"].ToString()!,
                            SupplierID = row["SupplierID"] == DBNull.Value ? null : Convert.ToInt32(row["SupplierID"]),
                            CategoryID = Convert.ToInt32(row["CategoryID"]),
                            CategoryName = row["CategoryName"].ToString()!,
                            QuantityPerUnit = row["QuantityPerUnit"].ToString(),
                            UnitPrice = row["UnitPrice"] == DBNull.Value ? null : Convert.ToDecimal(row["UnitPrice"]),
                            UnitsInStock = row["UnitsInStock"] == DBNull.Value ? null : Convert.ToInt32(row["UnitsInStock"]),
                            UnitsOnOrder = row["UnitsOnOrder"] == DBNull.Value ? null : Convert.ToInt32(row["UnitsOnOrder"]),
                            ReorderLevel = row["ReorderLevel"] == DBNull.Value ? null : Convert.ToInt32(row["ReorderLevel"]),
                            Discontinued = Convert.ToBoolean(row["Discontinued"])



                        });
                    }


                }
            }
            catch (Exception ex)
            {
                string Metodo = "Solicitud Lista";
                LogEventoIngresar(ex, Metodo);
            }

            return lista;
        }

        // obtener detalle producto
        public ProductModel ObtenerProductoPorId(int id)
        {
            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataSet ds = new DataSet();
            ProductModel producto = new ProductModel();

            try
            {
                SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandTimeout = 10000;
                comandoSQL.CommandText = "sp_ObtenerProductoPorId";
                comandoSQL.Parameters.Clear();
                comandoSQL.Parameters.AddWithValue("@ProductID", id);
                adaptador.SelectCommand = comandoSQL;
                adaptador.Fill(ds);
                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow row = ds.Tables[0].Rows[0];

                    return new ProductModel
                    {
                        ProductID = Convert.ToInt32(row["ProductID"]),
                        ProductName = row["ProductName"].ToString()!,
                        SupplierID = row["SupplierID"] == DBNull.Value ? null : Convert.ToInt32(row["SupplierID"]),
                        CategoryID = Convert.ToInt32(row["CategoryID"]),
                        Picture = row["Picture"].ToString()!,
                        CategoryName = row["CategoryName"].ToString()!,
                        QuantityPerUnit = row["QuantityPerUnit"].ToString(),
                        UnitPrice = row["UnitPrice"] == DBNull.Value ? null : Convert.ToDecimal(row["UnitPrice"]),
                        UnitsInStock = row["UnitsInStock"] == DBNull.Value ? null : Convert.ToInt32(row["UnitsInStock"]),
                        UnitsOnOrder = row["UnitsOnOrder"] == DBNull.Value ? null : Convert.ToInt32(row["UnitsOnOrder"]),
                        ReorderLevel = row["ReorderLevel"] == DBNull.Value ? null : Convert.ToInt32(row["ReorderLevel"]),
                        Discontinued = Convert.ToBoolean(row["Discontinued"])

                    };

                }


            }
            catch (Exception ex)
            {
                string Metodo = "Solicitud desatlle producto" + id;
                LogEventoIngresar(ex, Metodo);
            }


            return producto;
        }


        //creacion de producto
        public int CrearProducto(ProductModel producto)
        {
            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataSet ds = new DataSet();
            List<ProductModel> lista = new List<ProductModel>();
            int productId = 0;

            try
            {
                SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandTimeout = 10000;
                comandoSQL.CommandText = "sp_CrearProducto";
                comandoSQL.Parameters.Clear();
                comandoSQL.Parameters.AddWithValue("@ProductName", producto.ProductName);
                comandoSQL.Parameters.AddWithValue("@SupplierID", producto.SupplierID);
                comandoSQL.Parameters.AddWithValue("@CategoryID", producto.CategoryID);
                comandoSQL.Parameters.AddWithValue("@QuantityPerUnit", producto.QuantityPerUnit);
                comandoSQL.Parameters.AddWithValue("@UnitPrice", producto.UnitPrice);
                comandoSQL.Parameters.AddWithValue("@UnitsInStock", producto.UnitsInStock);
                comandoSQL.Parameters.AddWithValue("@UnitsOnOrder", producto.UnitsOnOrder);
                comandoSQL.Parameters.AddWithValue("@ReorderLevel", producto.ReorderLevel);
                comandoSQL.Parameters.AddWithValue("@Discontinued", producto.Discontinued);
                conexionSQL.Open();

                var result = comandoSQL.ExecuteScalar();

                if (result != null)
                {
                    productId = Convert.ToInt32(result);
                }


            }
            catch (Exception ex)
            {
                string Metodo = "Solicitud creacion producto";
                LogEventoIngresar(ex, Metodo);
            }


            return productId;

        }

        // creacion de productos froma masiva
        public async Task<bool> BulkInsertProducts(int quantity)
        {
            try
            {
                DataTable table = new DataTable();
                // creacion de las columna s
                table.Columns.Add("ProductName");
                table.Columns.Add("SupplierID");
                table.Columns.Add("CategoryID");
                table.Columns.Add("QuantityPerUnit");
                table.Columns.Add("UnitPrice");
                table.Columns.Add("UnitsInStock");
                table.Columns.Add("UnitsOnOrder");
                table.Columns.Add("ReorderLevel");
                table.Columns.Add("Discontinued");

                Random random = new Random();

               // generar productos

                for (int i = 0; i < quantity; i++)
                {
                    int categoryId =
                        i % 2 == 0
                        ? 1 
                        : 2; 

                    table.Rows.Add(
                        $"Producto {i + 1}",
                        random.Next(1, 50),
                        categoryId,
                        "1 unidad",
                        random.Next(100, 10000),
                        random.Next(1, 500),
                        random.Next(1, 100),
                        random.Next(1, 20),
                        false
                    );
                }

                /// la conexion a base dde datos

                using SqlConnection connection =new SqlConnection(strConexionSQL);

                await connection.OpenAsync();


                // copia masiva bull copy


                using SqlBulkCopy bulkCopy =  new SqlBulkCopy(connection);

                bulkCopy.DestinationTableName ="Products";
                // batches

                bulkCopy.BatchSize = 5000;

              // timeout sin limite de tiempo

                bulkCopy.BulkCopyTimeout = 0;

                // mapeo de datos 

                bulkCopy.ColumnMappings.Add("ProductName","ProductName");
                bulkCopy.ColumnMappings.Add("SupplierID","SupplierID");
                bulkCopy.ColumnMappings.Add( "CategoryID","CategoryID");
                bulkCopy.ColumnMappings.Add("QuantityPerUnit","QuantityPerUnit");
                bulkCopy.ColumnMappings.Add("UnitPrice","UnitPrice");
                bulkCopy.ColumnMappings.Add("UnitsInStock","UnitsInStock");
                bulkCopy.ColumnMappings.Add("UnitsOnOrder","UnitsOnOrder");
                bulkCopy.ColumnMappings.Add("ReorderLevel","ReorderLevel");
                bulkCopy.ColumnMappings.Add("Discontinued","Discontinued");

                // inserta 

                await bulkCopy.WriteToServerAsync(
                    table
                );

                return true;
            }
            catch (Exception ex)
            {
                LogEventoIngresar(
                    ex, "Insercion de cantidad alta de datos"
                );
            }

            return false;
        }



        // actualizacion del producto
        public bool ActualizarProducto( int productId,ProductModel product)
        {
            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            try
            {
                using SqlConnection conexionSQL = new SqlConnection(strConexionSQL);
                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandTimeout = 10000;
                comandoSQL.CommandText = "sp_ActualizarProducto";
                comandoSQL.Parameters.Clear();
                comandoSQL.Parameters.AddWithValue("@ProductID",productId);
                comandoSQL.Parameters.AddWithValue("@ProductName",product.ProductName);
                comandoSQL.Parameters.AddWithValue("@SupplierID",(object?)product.SupplierID?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@CategoryID",product.CategoryID);
                comandoSQL.Parameters.AddWithValue("@QuantityPerUnit",(object?)product.QuantityPerUnit?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@UnitPrice",(object?)product.UnitPrice ?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@UnitsInStock",(object?)product.UnitsInStock?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@UnitsOnOrder",(object?)product.UnitsOnOrder?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@ReorderLevel",(object?)product.ReorderLevel?? DBNull.Value);
                comandoSQL.Parameters.AddWithValue("@Discontinued",product.Discontinued);
                conexionSQL.Open();

                int rows =comandoSQL.ExecuteNonQuery();

                if (rows == -1)
                {
                    return true;
                }
               
            }
            catch (Exception ex)
            {
                LogEventoIngresar(ex,"ActualizarProducto");
            }

            return false;
        }


        // eliminar producto 
        public bool EliminarProducto( int productId)
        {
            using SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

            try
            {

                using SqlCommand comandoSQL =new SqlCommand("sp_EliminarProducto",conexionSQL);

                comandoSQL.CommandType =CommandType.StoredProcedure;
                comandoSQL.Parameters.AddWithValue( "@ProductID",productId );
                conexionSQL.Open();
                int rows =comandoSQL.ExecuteNonQuery();
                if (rows == -1)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                LogEventoIngresar(ex, "EliminarProducto");
            }

            return false;
        }








        // logs
        public bool LogEventoIngresar(Exception ex , string Metodo)
        {
            ObjLogAsisyaModel model = new ObjLogAsisyaModel();
            model.Mensaje = ex.Message;
            model.Fuente = Metodo;
            model.Seguimiento = "Verificación";


            if (model.Fuente == null)
            {
                model.Fuente = "";
            }
            if (model.Seguimiento == null)
            {
                model.Seguimiento = "";
            }
            SqlConnection conexionSQL = new SqlConnection(strConexionSQL);
            SqlCommand comandoSQL = new SqlCommand();

            try
            {
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandText = "sp_log_eventos_ingresar";
                comandoSQL.Parameters.AddWithValue("@mensaje", model.Mensaje);
                comandoSQL.Parameters.AddWithValue("@fuente  ", model.Fuente);
                comandoSQL.Parameters.AddWithValue("@seguimiento", model.Seguimiento);



                comandoSQL.Connection = conexionSQL;
                comandoSQL.Connection.Open();
                comandoSQL.ExecuteNonQuery();

            }
            catch (Exception exe)
            {
                return false;
            }
            finally
            {
                comandoSQL.Parameters.Clear();
                comandoSQL.Connection.Close();
            }
            return true;
        }



    }
}
