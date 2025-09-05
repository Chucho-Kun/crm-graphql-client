"use client"
import NuevoCliente from "@/components/pedidos/NuevoCliente";
import { PedidoContext } from "@/context/pedidos/PedidoContext";
import { useContext } from "react";

export default function nuevoPedidoPage() {  

  const pedidoContext = useContext(PedidoContext)
    
    return (
    <>
    <div>
      Crear Nuevo Pedido
    </div>

    <NuevoCliente />
    
    </>
  )
}
