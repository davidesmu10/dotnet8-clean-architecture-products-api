namespace asisya_api.Helpers
{
    public class LeerConfiguraciones
    {

        public string GetStrConexion()
        {
            //Leer archivo appsettings.json
            var builder = new ConfigurationBuilder()
           .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();
            return configuration["strConexionSQL"];
        }

        
    }
}
