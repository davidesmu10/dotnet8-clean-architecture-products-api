namespace asisya_api.Models
{
    public class ObjLogAsisyaModel
    {
        public string Mensaje { get; set; }
        public string Fuente { get; set; }
        public string Seguimiento { get; set; }

        public DateTime FechaError { get; set; }
    }
}
