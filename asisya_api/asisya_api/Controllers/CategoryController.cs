using asisya_api.Data;
using asisya_api.DTOs;
using asisya_api.Interfaces;
using asisya_api.Models;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace asisya_api.Controllers
{

    [ApiController]
    [Route("api")]
    public class CategoryController : Controller
    {

        private readonly ICategoryData _categoryData;

        public CategoryController(ICategoryData categoryData)
        {
            _categoryData = categoryData;
        }



        [Authorize]
        [HttpPost]
        [Route("creacionCategoria")]
        public IActionResult CreacionCategorias([FromBody] CategoryModel categoria) {


            try
            {
                if (string.IsNullOrWhiteSpace(categoria.CategoryName))
                {
                    return BadRequest(new
                    {
                        message = "CategoryName es obligatorio"
                    });
                }

                if (categoria.Description == null)
                {
                    return BadRequest(new
                    {
                        message = "Description es obligatorio"
                    });
                }

                int Categoria = _categoryData.CreacionCategoria(categoria);

                if (Categoria <= 0)
                {
                    return BadRequest(new
                    {
                        message ="No fue posible crear el producto"
                    });
                }

                return Ok(
                    new
                    {
                        Categoria,
                        message = "Producto creado correctamente"
                    }
                );
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
