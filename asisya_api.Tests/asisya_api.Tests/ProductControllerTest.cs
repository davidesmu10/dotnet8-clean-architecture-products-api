using asisya_api.Controllers;
using asisya_api.DTOs;
using asisya_api.Interfaces;
using asisya_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Security.Claims;
using Xunit;

namespace asisya_api.Tests
{
    public class ProductControllerTest
    {
        [Fact]
        public void ListadoProductos_DeberiaRetornarOk()
        {
            // Arrange
            var mockProductData = new Mock<IProductData>();

            var filtro = new ProductFilterDto
            {
                PageNumber = 1,
                PageSize = 10
            };

            mockProductData
                .Setup(x => x.ObtenerListadoProductos(It.IsAny<ProductFilterDto>()))
                .Returns(new List<ProductModel>
                {
                    new ProductModel
                    {
                        ProductID = 1,
                        ProductName = "Producto Test",
                        CategoryID = 1
                    }
                });

            var controller = new ProductController(mockProductData.Object);

            // 🔥 simular usuario autenticado (por [Authorize])
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "testuser")
            }, "TestAuth"));

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = user
                }
            };

            // Act
            var resultado = controller.ListadoProductos(filtro);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(resultado);
            Assert.NotNull(okResult.Value);
        }


        [Fact]
        public void ObtenerProductoPorId_DeberiaRetornarOk()
        {
            var mock = new Mock<IProductData>();

            mock.Setup(x => x.ObtenerProductoPorId(1))
                .Returns(new ProductModel
                {
                    ProductID = 1,
                    ProductName = "Producto Test"
                });

            var controller = new ProductController(mock.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
        new Claim(ClaimTypes.Name, "testuser")
    }, "TestAuth"));

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            var result = controller.ObtenerProductoPorId(1);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(ok.Value);
        }



        [Fact]
        public void CrearProducto_DeberiaRetornarCreated()
        {
            var mock = new Mock<IProductData>();

            mock.Setup(x => x.CrearProducto(It.IsAny<ProductModel>()))
                .Returns(1);

            var controller = new ProductController(mock.Object);

            var producto = new ProductModel
            {
                ProductName = "Nuevo producto",
                CategoryID = 1
            };

            var result = controller.CreacionProductos(producto);

            Assert.IsType<CreatedResult>(result);
        }



        

        [Fact]
        public void EliminarProducto_DeberiaRetornarOk()
        {
            var mock = new Mock<IProductData>();

            mock.Setup(x => x.EliminarProducto(1))
                .Returns(true);

            var controller = new ProductController(mock.Object);

            var result = controller.EliminarProducto(1);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}