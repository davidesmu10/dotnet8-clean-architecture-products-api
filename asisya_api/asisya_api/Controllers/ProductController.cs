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
    public class ProductController : Controller
    {
        private readonly IProductData _productData;
        public ProductController(IProductData productData)
        {
            _productData = productData;
        }

        // listado de productos

        [Authorize]
        [HttpGet]
        [Route("ListadoProductos")]
        public IActionResult ListadoProductos([FromQuery] ProductFilterDto filter)
        {
            try
            {
                if (filter.PageNumber <= 0)
                {
                    return BadRequest(new
                    {
                        message = "PageNumber debe ser mayor a 0"
                    });
                }

                if (filter.PageSize <= 0)
                {
                    return BadRequest(new
                    {
                        message = "PageSize debe ser mayor a 0"
                    });
                }

                var result = _productData.ObtenerListadoProductos(filter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }

        // deatlle del producto

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult ObtenerProductoPorId(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        message = "El id es obligatorio"
                    });
                }

                var result = _productData.ObtenerProductoPorId(id);

                if (result.ProductID != id)
                {
                    return NotFound(new
                    {
                        message = "Producto no encontrado"
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }



        // creacion del producto 
        [Authorize]
        [HttpPost]
        [Route("CreacionProducto")]
        public IActionResult CreacionProductos([FromBody] ProductModel producto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(producto.ProductName))
                {
                    return BadRequest(new
                    {
                        message ="ProductName es obligatorio"
                    });
                }

                if (producto.CategoryID <= 0)
                {
                    return BadRequest(new
                    {
                        message ="CategoryID es obligatorio"
                    });
                }

                int productId =
                    _productData.CrearProducto(producto);

                if (productId <= 0)
                {
                    return BadRequest(new
                    {
                        message =
                            "No fue posible crear el producto"
                    });
                }

                return Created(
                    $"/api/{productId}",
                    new
                    {
                        productId,message ="Producto creado correctamente"
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

        // actualizacion producto 

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult ActualizarProducto( int id,[FromBody] ProductModel producto)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        message = "Id inválido"
                    });
                }

                if (string.IsNullOrWhiteSpace(producto.ProductName)
                )
                {
                    return BadRequest(new
                    {
                        message ="ProductName es obligatorio"
                    });
                }

                bool actualizado =_productData.ActualizarProducto( id, producto );

                if (!actualizado)
                {
                    return NotFound(new
                    {
                        message =
                            "Producto no encontrado"
                    });
                }

                return Ok(new
                {
                    message =
                        "Producto actualizado correctamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }



        // elimar producto
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult EliminarProducto(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        message = "Id inválido"
                    });
                }

                bool eliminado = _productData.EliminarProducto(id);

                if (!eliminado)
                {
                    return NotFound(new
                    {
                        message ="Producto no encontrado"
                    });
                }

                return Ok(new
                {
                    message = "Producto eliminado correctamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message
                });
            }
        }


        [Authorize]
        [HttpPost("Bulk")]
        public async Task<IActionResult>BulkInsertProductos([FromBody]ProductBulkRequestDto request)
        {
            try
            {
                if (request.Quantity <= 0)
                {
                    return BadRequest(new
                    {
                        message = "Quantity debe ser mayor a 0"
                    });
                }

                bool result =await _productData.BulkInsertProducts( request.Quantity);

                if (!result)
                {
                    return BadRequest(new
                    {
                        message ="Error en carga masiva"
                    });
                }

                return Ok(new
                {
                    message =
                        $"{request.Quantity} productos insertados correctamente"
                });
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
