export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-100">

        <div className="mb-6">
          <div className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            Backend API
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenido a <span className="text-blue-600">Asisya API</span>
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Sistema de gestión de productos y categorías diseñado para ser rápido,
          escalable y fácil de integrar con arquitecturas modernas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 bg-blue-50 hover:bg-blue-100 transition rounded-xl border border-blue-100 cursor-pointer">
            <h2 className="font-semibold text-blue-700 mb-1">📦 Productos</h2>
            <p className="text-sm text-gray-600">
              Administra, crea y consulta el catálogo.
            </p>
          </div>

          <div className="p-6 bg-green-50 hover:bg-green-100 transition rounded-xl border border-green-100 cursor-pointer">
            <h2 className="font-semibold text-green-700 mb-1">📂 Categorías</h2>
            <p className="text-sm text-gray-600">
              Organiza tu inventario de forma eficiente.
            </p>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-400">
          API v1 · Clean Architecture · .NET + React
        </div>

      </div>
    </div>
  );
}