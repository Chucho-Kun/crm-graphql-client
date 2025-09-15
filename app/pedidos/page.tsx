"use client"
import Loader from "@/components/layouts/Loader";
import Pedido from "@/components/pedidos/Pedido";
import { OBTENER_PEDIDOS_VENDEDOR } from "@/graphql/pedidos";
import { ObtenerPedidosType } from "@/types";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";

export default function pedidosPage() {

  const { data , loading } = useQuery<ObtenerPedidosType>( OBTENER_PEDIDOS_VENDEDOR )  

  if( !data) return 
  const { obtenerPedidosVendedor } = data;
  
  if( loading ) return <Loader />

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

      <Link 
        href='pedidos/nuevopedido'
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-xs hover:bg-blue-700 mb-2 uppercase"  
      >
        Nuevo Pedido
      </Link>

      { obtenerPedidosVendedor.length === 0 ? (
        <p className="mt-5 text-center text-2xl" >No hay pedidos aún</p>
      ) : (
        obtenerPedidosVendedor.map( pedido => (
          <Pedido key={ pedido.id } pedido={ pedido } />
        ) )
      )}

    </div>
  )
}
