namespace asisya_api.Models
{
    public class UserModel
    {
        public int? Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;
    }
}
