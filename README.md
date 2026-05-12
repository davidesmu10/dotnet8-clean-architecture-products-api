Product API - Clean Architecture (.NET 8)

Proyecto desarrollado en .NET 8 siguiendo principios de Clean Architecture, con React en el frontend y SQL Server como base de datos.
La solución está diseñada para soportar alto volumen de datos (100.000+ productos) manteniendo escalabilidad, mantenibilidad y buen rendimiento.

Tecnologías Utilizadas
.NET 8 Web API
React
SQL Server
Entity Framework Core
JWT Authentication
Docker
xUnit Testing
Arquitectura

El proyecto sigue una estructura basada en Clean Architecture:

Domain → Entidades y reglas del negocio
Application → Casos de uso, DTOs y lógica de aplicación
Infrastructure → Persistencia de datos y acceso a SQL Server
API → Controllers, middlewares y configuración
Frontend → Aplicación React con autenticación JWT
Descripción General

Este proyecto implementa una solución Full Stack escalable y desacoplada, enfocada en:

Buenas prácticas de desarrollo
Separación de responsabilidades
Escalabilidad
Seguridad mediante JWT
Procesamiento masivo de información

Incluye:

API REST en .NET 8
Frontend en React
Autenticación JWT
Inserción masiva de productos
Pruebas unitarias e integración
Dockerización completa
Pipeline CI/CD básico
Ejecución Local
Backend
dotnet restore
dotnet run
Frontend
npm install
npm run dev
Docker
docker-compose up --build
Base de Datos

La base de datos puede inicializarse ejecutando el script SQL incluido en el proyecto.

Script SQL

Ejecutar el archivo correspondiente de creación de base de datos y tablas.

Swagger

La API cuenta con documentación interactiva mediante Swagger.

URL Local
http://localhost:5000/swagger
Auth Controller
POST /api/auth
Descripción

Autentica un usuario y genera un token JWT para acceder a endpoints protegidos.

Debe existir previamente un usuario registrado en la tabla Users de la base de datos.

Request
{
  "username": "admin",
  "passwordHash": "123456"
}
Flujo
Se recibe usuario y contraseña
Se valida contra la base de datos
Si es válido:
Se genera un token JWT
Se retorna el token junto al username
Response — 200 OK
{
  "token": "jwt_token_generado",
  "username": "admin"
}
Errores
Código	Descripción
401	Usuario o contraseña incorrectos
500	Error interno del servidor
Product Controller
GET /api/ListadoProductos
Descripción

Obtiene el listado paginado de productos con filtros opcionales.

Query Params
Parámetro	Tipo
pageNumber	int
pageSize	int
search	string
categoryId	int
Reglas
pageNumber > 0
pageSize > 0
Response

Retorna una lista paginada de productos.

GET /api/{id}
Descripción

Obtiene el detalle de un producto por ID.

Reglas
id > 0
Si no existe → 404 Not Found
Response
{
  "productID": 1,
  "productName": "Laptop",
  "categoryID": 2
}
POST /api/CreacionProducto
Descripción

Crea un nuevo producto en la base de datos.

Request
{
  "productName": "Laptop Dell",
  "categoryID": 1,
  "price": 1200
}
Validaciones
ProductName obligatorio
CategoryID > 0
Response — 201 Created
{
  "productId": 10,
  "message": "Producto creado correctamente"
}
PUT /api/{id}
Descripción

Actualiza un producto existente.

Validaciones
id > 0
ProductName obligatorio
Response
{
  "message": "Producto actualizado correctamente"
}
DELETE /api/{id}
Descripción

Elimina un producto por ID.

Response
{
  "message": "Producto eliminado correctamente"
}
POST /api/Bulk
Descripción

Inserta productos de forma masiva.

Request
{
  "quantity": 100000
}
Uso

Ideal para pruebas de rendimiento y escalabilidad.

Response
{
  "message": "100000 productos insertados correctamente"
}
Category Controller
POST /api/creacionCategoria
Descripción

Crea una nueva categoría en el sistema.

Request
{
  "categoryName": "SERVIDORES",
  "description": "Infraestructura cloud"
}
Validaciones
CategoryName obligatorio
Description obligatorio
Response
{
  "categoria": 1,
  "message": "Categoria creada correctamente"
}
Postman

El proyecto incluye una colección de Postman para pruebas de la API.

Ubicación
/postman/prueba.postman_collection.json
Uso
Importar la colección en Postman
Seleccionar el environment local
Ejecutar el endpoint de login
Utilizar automáticamente el token JWT en endpoints protegidos
