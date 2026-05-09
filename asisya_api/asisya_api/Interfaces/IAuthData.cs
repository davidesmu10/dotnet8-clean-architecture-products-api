using asisya_api.Models;

namespace asisya_api.Interfaces
{
    public interface IAuthData
    {
        UserModel ObtenerUsuario(UserModel user);
    }
}