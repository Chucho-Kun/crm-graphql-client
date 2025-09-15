import { ACTUALIZAR_PEDIDO, ELIMINAR_PEDIDO, OBTENER_PEDIDOS } from "@/graphql/pedidos";
import { ActualizarPedidoType, EliminarPedidoType, ObtenerPedidosType, PedidoType } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type PedidoProps = {
    pedido: PedidoType
}

export default function Pedido({ pedido }: PedidoProps) {

    const { id, total, cliente: { nombre, apellido, telefono, email }, estado , cliente } = pedido

    const [ actualizarPedido ] = useMutation<ActualizarPedidoType>(ACTUALIZAR_PEDIDO)
    const [ eliminarPedido ] = useMutation<EliminarPedidoType>( ELIMINAR_PEDIDO , {
        update( cache ){

            const obtenerPedidosVendedor = cache.readQuery<ObtenerPedidosType>({
                query: OBTENER_PEDIDOS
            })
            if(!obtenerPedidosVendedor) return;

            const pedidosActualizados = obtenerPedidosVendedor.obtenerPedidosVendedor.filter( (pedido: { id:string}) => pedido.id !== id )

            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data:{
                    obtenerPedidosVendedor: pedidosActualizados
                }
            })
        }
    })

    const [ estadoPedido , setEstadoPedido ] = useState(estado);
    const [ clase , setClase ] = useState('');
    const [ claseBtn , setClaseBtn ] = useState('');

    useEffect(() => {
        if (estadoPedido){
            setEstadoPedido(estadoPedido);
        } 
        clasePedido()
    }, [estadoPedido])

    const clasePedido = () => {

        let estado = ( estadoPedido === 'PENDIENTE' ) ? 'border-yellow-500' : ( estadoPedido === 'COMPLETADO' ) ? 'border-green-500' : 'border-red-800';
        let estadoBtn = ( estadoPedido === 'PENDIENTE' ) ? 'bg-yellow-500' : ( estadoPedido === 'COMPLETADO' ) ? 'bg-green-500' : 'bg-red-800';
        setClase( estado )
        setClaseBtn( estadoBtn )
    }

    const cambiarEstadoPedido = async (nuevoEstado : string ) => {
        try {
            const { data } = await actualizarPedido({
                variables:{
                    id, 
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            })

            if( !data )return;
            setEstadoPedido( data.actualizarPedido.estado )

        } catch (error) {
            console.log(error);
        }

    }

    const eliminarPedidoBtn = ( id: string ) => {
        
         Swal.fire({
                    title: "Borrar Pedido",
                    text: `Deseas borrar el pedido de ${ nombre } ${ apellido }?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#b9b9b9",
                    confirmButtonText: "Borrar",
                    reverseButtons: true
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const { data } = await eliminarPedido({
                                variables:{
                                    id
                                }
                            })

                            if( !data ) return;

                            Swal.fire(
                                'Pedido Eliminado',
                                data.eliminarPedido,
                                'success'
                            )

                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
        
    }

    return (
        <div className={`${ clase } border-t-4 mt-4 bg-white rounded p-6 grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                {nombre && (
                    <p className="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        {nombre} { apellido }
                    </p>
                )}
                
                {email && (
                    <p className="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>

                        {email}
                    </p>
                )}
                
                {telefono && (
                    <p className="flex items-center my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                            <path fillRule="evenodd" d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z" clipRule="evenodd" />
                        </svg>
                        {telefono}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-2" >Estado Pedido</h2>

                <select
                    className={`${ claseBtn } mt-2 appearance-none border text-white px-5 py-3 text-center rounded leading-tight focus:outline-none focus:${ claseBtn } uppercase text-xs font-bold`}
                    value={estadoPedido}
                    id="estado"
                    onChange={ e => cambiarEstadoPedido( e.target.value ) }
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
                    onClick={ () => eliminarPedidoBtn( id ) }
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




