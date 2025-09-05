"use client"
import NuevoCliente from "@/components/pedidos/NuevoCliente";
import NuevoProducto from "@/components/pedidos/NuevoProducto";
import ResumenPedido from "@/components/pedidos/ResumenPedido";
import Total from "@/components/pedidos/Total";
import { PedidoContext } from "@/context/pedidos/PedidoContext";
import { useContext } from "react";

export default function nuevoPedidoPage() {

  const pedidoContext = useContext(PedidoContext)

  return (
    <>
      <div>Crear Nuevo Pedido</div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg bg-gray-100 p-10 rounded-xl">
          <NuevoCliente />
          <NuevoProducto />
          <ResumenPedido />
          <Total />

          <button
            className={ `bg-gray-500 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer` }
          >REGISTRAR PEDIDO</button>
        </div>
      </div>


    </>
  )
}
