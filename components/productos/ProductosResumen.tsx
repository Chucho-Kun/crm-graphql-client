import { PedidoContext } from '@/context/pedidos/PedidoContext'
import { InputProducto } from '@/types'
import { useContext, useState } from 'react'

type ProductosResumenProps = {
    producto: InputProducto
}

export default function ProductosResumen({ producto }: ProductosResumenProps) {

    const [ cantidad , setCantidad ] = useState('')

    const pedidocontext = useContext( PedidoContext )

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nuevaCantidad = e.target.value;
      setCantidad(nuevaCantidad);

      const cantidadNumerica = Number(nuevaCantidad);
      if (pedidocontext && !isNaN(cantidadNumerica)) {
        const nuevoProducto = { ...producto, cantidad: cantidadNumerica };
        pedidocontext.cantidadProductos(nuevoProducto);
        pedidocontext.actualizaTotal();
      }
    };

    const { nombre, precio } = producto

    return (
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{nombre}</p>
                <p className='text-sm'>${precio}</p>
            </div>
            <input
                type="number"
                placeholder='Cantidad'
                className='shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:shadow-outline md:ml-4'
                onChange={ handleCantidadChange }
                value={ cantidad }
            />
        </div>
    )
}
