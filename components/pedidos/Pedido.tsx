import { PedidoType } from "@/types";
import { useEffect, useState } from "react";

type PedidoProps = {
    pedido: PedidoType
}

export default function Pedido({ pedido }: PedidoProps) {

    const { id, total, cliente, estado } = pedido
    //  pedido : { cantidad , id : idPedido , nombre }
    const [estadoPedido, setEstadoPedido] = useState(estado)

    useEffect(() => {
        if (estadoPedido) setEstadoPedido(estadoPedido)
    }, [estadoPedido])

    return (
        <div className="mt-4 bg-white rounded p-6 grid md:grid-cols-2 md:gap-4 shadow-lg">
            <div>
                <p className="font-bold text-gray-800" >Cliente {cliente}</p>
                <h2 className="text-gray-800 font-bold mt-10" >Estado Pedido</h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-sm font-bold"
                    value={estadoPedido}
                    id="estado"
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Total a pagar:
                    <span className="font-light">$ {total}</span>
                </p>

                <button
                    className="flex uppercase text-xs font-bold items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight hover:bg-red-700 cursor-pointer"
                >Eliminar
                    <div className='ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                </button>


            </div>
        </div>
    )
}
