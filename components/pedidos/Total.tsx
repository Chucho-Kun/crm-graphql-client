import { PedidoContext } from '@/context/pedidos/PedidoContext';
import React, { useContext } from 'react'

export default function Total() {

    const pedidocontext = useContext( PedidoContext );
    if( !pedidocontext ) return;
    const { total } = pedidocontext;

    return (
        <div className='flex items-center mt-5 justify-between bg-white p-3'>
            <h2 className='text-gray-800 text-lg'>Total a pagar:</h2>
            <p className='text-gray-800 mt-0'>${total}</p>
        </div>
    )
}
