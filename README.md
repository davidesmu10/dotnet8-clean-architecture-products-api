# 馃 Product API - Clean Architecture (.NET 8)

Proyecto desarrollado en .NET 8 con arquitectura limpia, React en frontend y SQL Server como base de datos.
Dise帽ada para manejo de alto volumen de datos (100,000+ productos).

## 馃殌 Tecnolog铆as
- .NET 8 Web API
- React
- SQL Server
- Entity Framework Core
- JWT Authentication
- Docker
- xUnit (Testing)

## 馃摝 Arquitectura
El proyecto sigue principios de Clean Architecture:

- Domain: entidades
- Application: casos de uso
- Infrastructure: persistencia
- API: controladores

## 馃搶 Descripci贸n

Este proyecto implementa una soluci贸n full stack escalable basada en arquitectura limpia (Clean Architecture), con enfoque en separaci贸n de responsabilidades, rendimiento y buenas pr谩cticas de desarrollo.

Incluye:

- API REST en .NET 8
- Frontend en React
- Autenticaci贸n JWT
- Procesamiento masivo de datos (100,000 productos)
- Pruebas unitarias e integraci贸n
- Contenerizaci贸n con Docker
- Pipeline CI/CD b谩sico

- ## 馃彈锔?Arquitectura

El proyecto sigue Clean Architecture:

- **Domain**: Entidades del negocio (Product, Category)
- **Application**: Casos de uso, DTOs, l贸gica de negocio
- **Infrastructure**: Acceso a datos (EF Core, SQL Server)
- **API**: Controllers, configuraci贸n, middleware
- **Frontend**: React SPA con autenticaci贸n JWT

- ## 馃殌 Ejecuci贸n local

### Backend
```bash
dotnet restore
dotnet run

FRONTED
npm install
npm run dev

DOCKER

docker-compose up --build

## 馃梽锔?Base de Datos

La base de datos puede inicializarse:

###Script SQL
Ejecutar el archivo


## Swagger

La API cuenta con documentaci贸n interactiva usando Swagger.

### URL local: http://localhost:5000/swagger


AUTH CONTROLLER
POST /api/auth
馃搶 Descripci贸n

Autentica un usuario en el sistema y genera un token JWT para acceso a endpoints protegidos.

### se debe ingresar en base de datos tabla user usuario y contrase帽a a utilizar

馃摜 Request
{
  "username": "admin",
  "passwordHash": "123456"
}
鈿欙笍 Flujo
Se recibe usuario y contrase帽a
Se valida contra base de datos (_authData.ObtenerUsuario)
Si es v谩lido:
Se genera token JWT con JwtService
Se retorna token + username
馃摛 Response (200 OK)
{
  "token": "jwt_token_generado",
  "username": "admin"
}
鉂?Errores
401 Unauthorized: usuario o contrase帽a incorrectos
500: error interno del servidor
馃摝 PRODUCT CONTROLLER
GET /api/ListadoProductos
馃搶 Descripci贸n

Obtiene listado de productos con paginaci贸n y filtros.

馃摜 Query Params
pageNumber (int)
pageSize (int)
filtros adicionales (search, categoryId)
鈿欙笍 Reglas
pageNumber > 0
pageSize > 0
馃摛 Response

Lista paginada de productos.

GET /api/{id}
馃搶 Descripci贸n

Obtiene el detalle de un producto por ID.

鈿欙笍 Reglas
id > 0
Si no existe 鈫?404 Not Found
馃摛 Response
{
  "productID": 1,
  "productName": "Laptop",
  "categoryID": 2
}
POST /api/CreacionProducto
馃搶 Descripci贸n

Crea un nuevo producto en la base de datos.

馃摜 Request
{
  "productName": "Laptop Dell",
  "categoryID": 1,
  "price": 1200
}
鈿欙笍 Validaciones
ProductName obligatorio
CategoryID > 0
馃摛 Response (201 Created)
{
  "productId": 10,
  "message": "Producto creado correctamente"
}
PUT /api/{id}
馃搶 Descripci贸n

Actualiza un producto existente.

鈿欙笍 Validaciones
id > 0
ProductName obligatorio
馃摛 Response
{
  "message": "Producto actualizado correctamente"
}
DELETE /api/{id}
馃搶 Descripci贸n

Elimina un producto por ID.

馃摛 Response
{
  "message": "Producto eliminado correctamente"
}
POST /api/Bulk
馃搶 Descripci贸n

Inserta m煤ltiples productos de forma masiva.

馃摜 Request
{
  "quantity": 100000
}
鈿欙笍 Uso

Ideal para pruebas de rendimiento y escalabilidad.

馃摛 Response
{
  "message": "100000 productos insertados correctamente"
}
馃彿锔?CATEGORY CONTROLLER
POST /api/creacionCategoria
馃搶 Descripci贸n

Crea una nueva categor铆a en el sistema.

馃摜 Request
{
  "categoryName": "SERVIDORES",
  "description": "Infraestructura cloud"
}
鈿欙笍 Validaciones
CategoryName obligatorio
Description obligatorio
馃摛 Response
{
  "categoria": 1,
  "message": "Categoria creada correctamente"
}



## 馃摤 Postman

Se incluye colecci贸n de Postman para pruebas de la API.

### Ubicaci贸n:

/postman/prueba.postman_collection.json


### Uso:
1. Importar colecci贸n en Postman
2. Seleccionar environment "local"
3. Ejecutar login para generar token
4. Usar endpoints protegidos autom谩ticamente


