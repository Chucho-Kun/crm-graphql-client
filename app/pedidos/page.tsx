import Link from "next/link";

export default function pedidosPage() {
  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

      <Link 
        href='pedidos/nuevopedido'
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-xs hover:bg-blue-700 mb-2 uppercase"  
      >
        Nuevo Pedido
      </Link>
    </div>
  )
}
