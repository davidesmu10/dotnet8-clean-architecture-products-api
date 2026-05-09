using asisya_api.Data;
using asisya_api.DTOs;
using asisya_api.Interfaces;
using asisya_api.Models;
using asisya_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace asisya_api.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthData _authData;
        private readonly JwtService _jwtService;

        public AuthController(IAuthData authData, JwtService jwtService)
        {
            _authData = authData;
            _jwtService = jwtService;
        }

        [HttpPost]
        [Route("auth")]
        public IActionResult Auth(
            [FromForm] UserModel request
        )
        {
            try
            {
                UserModel userRequest = new UserModel
                {
                    Username = request.Username,
                    PasswordHash = request.PasswordHash
                };

                var user = _authData.ObtenerUsuario(
                    userRequest
                );

                if (user == null)
                {
                    return Unauthorized(new
                    {
                        message = "Usuario o contraseña incorrectos"
                    });
                }

                string token = _jwtService.GenerateToken(
                    user.Username
                );

                LoginRequestDto response =
                    new LoginRequestDto
                    {
                        Token = token,
                        Username = request.Username
                    };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }
    }
}