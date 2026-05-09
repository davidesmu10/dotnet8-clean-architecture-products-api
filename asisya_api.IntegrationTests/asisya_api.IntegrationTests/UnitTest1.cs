using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace asisya_api.IntegrationTests
{
    public class ProductIntegrationTest
        : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ProductIntegrationTest(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task ListadoProductos_ConJWT_DeberiaRetornarOk()
        {
            // hacer el login
            var loginContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("Username", "prueba"),
                new KeyValuePair<string, string>("PasswordHash", "prueba")
            });

            var loginResponse = await _client.PostAsync("/api/auth", loginContent);

            Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);

            var loginJson = await loginResponse.Content.ReadAsStringAsync();

           // traer el token

            using var doc = JsonDocument.Parse(loginJson);
            var token = doc.RootElement.GetProperty("token").GetString();

            Assert.NotNull(token);

            // setear jws
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            // lamada al enpoint 
            var response = await _client.GetAsync(
                "/api/ListadoProductos?pageNumber=1&pageSize=10"
            );

           // validacion
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}