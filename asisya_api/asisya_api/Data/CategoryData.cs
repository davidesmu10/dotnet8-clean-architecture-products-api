using asisya_api.Helpers;
using asisya_api.Interfaces;
using asisya_api.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace asisya_api.Data
{
    public class CategoryData : ICategoryData
    {

        LeerConfiguraciones objJson = new();
        string strConexionSQL = "";

        public CategoryData()
        {
            strConexionSQL = objJson.GetStrConexion();
        }


        public int CreacionCategoria(CategoryModel categoria)
        {

            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataSet ds = new DataSet();
            List<ProductModel> lista = new List<ProductModel>();
            int categoriaId = 0;

            try
            {
                SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandTimeout = 10000;
                comandoSQL.CommandText = "sp_CrearCategoria";
                comandoSQL.Parameters.Clear();
                comandoSQL.Parameters.AddWithValue("@CategoryName", categoria.CategoryName);
                comandoSQL.Parameters.AddWithValue("@Description", categoria.Description);
                comandoSQL.Parameters.AddWithValue("@Picture", categoria.Picture);
                conexionSQL.Open();

                var result = comandoSQL.ExecuteScalar();

                if (result != null)
                {
                    categoriaId= Convert.ToInt32(result);
                }


            }
            catch (Exception ex)
            {
                string Metodo = "Solicitud creacion categoria";
                LogEventoIngresar(ex, Metodo);
            }


            return categoriaId;

        }


        // logs
        public bool LogEventoIngresar(Exception ex, string Metodo)
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
