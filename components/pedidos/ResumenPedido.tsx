import { PedidoContext } from '@/context/pedidos/PedidoContext'
import React, { useContext } from 'react'
import ProductosResumen from '../productos/ProductosResumen';

export default function ResumenPedido() {

    const pedidocontext = useContext(PedidoContext);
    if (!pedidocontext) return;
    const { productos } = pedidocontext;

    console.log(productos);


    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                3.- Ajusta las cantidades del producto
            </p>

            {productos.length > 0 ? (

                productos.map(producto => (
                    <ProductosResumen
                        key={producto.id}
                        producto={producto}
                    />
                ))

            ) : (<p className='mt-5 text-sm'>Aun no hay productos</p>)}
        </>
    )
}
