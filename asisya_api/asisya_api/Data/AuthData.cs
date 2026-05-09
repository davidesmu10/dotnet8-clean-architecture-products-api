using asisya_api.Helpers;
using asisya_api.Interfaces;
using asisya_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using System.Data;

namespace asisya_api.Data
{
    public class AuthData : IAuthData
    {


        LeerConfiguraciones objJson = new();
        string strConexionSQL = "";

        public AuthData()
        {
            strConexionSQL = objJson.GetStrConexion();
        }


        public UserModel ObtenerUsuario(UserModel usermodel)
        {
            SqlCommand comandoSQL = new SqlCommand();
            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataSet ds = new DataSet();
            UserModel usuario = null;

            try
            {
                SqlConnection conexionSQL = new SqlConnection(strConexionSQL);

                comandoSQL.Connection = conexionSQL;
                comandoSQL.CommandType = CommandType.StoredProcedure;
                comandoSQL.CommandText = "sp_GetUser";

                comandoSQL.Parameters.AddWithValue("@Username", usermodel.Username);
                comandoSQL.Parameters.AddWithValue("@PasswordHash", usermodel.PasswordHash);

                adaptador.SelectCommand = comandoSQL;
                adaptador.Fill(ds);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow row = ds.Tables[0].Rows[0];

                    usuario = new UserModel
                    {
                        Id = Convert.ToInt32(row["Id"]),
                        Username = row["Username"].ToString()!
                    };
                }
            }
            catch (Exception ex)
            {
                LogEventoIngresar(ex, "Auth");
            }

            return usuario;
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
