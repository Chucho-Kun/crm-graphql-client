"use client"
import NuevoCliente from "@/components/pedidos/NuevoCliente";
import NuevoProducto from "@/components/pedidos/NuevoProducto";
import ResumenPedido from "@/components/pedidos/ResumenPedido";
import Total from "@/components/pedidos/Total";
import { PedidoContext } from "@/context/pedidos/PedidoContext";
import { NUEVO_PEDIDO, OBTENER_PEDIDOS } from "@/graphql/pedidos";
import { NuevoPedidoType, ObtenerPedidosType } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

export default function nuevoPedidoPage() {

  const [ mensaje , setMensaje ] = useState('')

  const router = useRouter()

  const pedidoContext = useContext(PedidoContext)
  if( !pedidoContext ) return;
  const { cliente , productos , total } = pedidoContext; 

  const [ nuevoPedido ] = useMutation<NuevoPedidoType>( NUEVO_PEDIDO , {
    update( cache , { data } ){
      if( !data?.nuevoPedido ) return;

      const nuevoCache = data.nuevoPedido
      const dataResponse = cache.readQuery<ObtenerPedidosType>({
        query: OBTENER_PEDIDOS
      });

      if( !dataResponse ) return;
      const { obtenerPedidosVendedor } = dataResponse;

      cache.writeQuery({
        query:OBTENER_PEDIDOS,
        data:{
          obtenerPedidosVendedor: [ ...obtenerPedidosVendedor, nuevoCache ]
        }
      })
    }
  } )

    const crearNuevoPedido = async () => {
    const { id } = cliente[0]

    //remover variables no necesarias
    const pedido = productos.map( ( { __typename, existencia , creado , ...producto } ) => producto )
    
    try {
      await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }
        }
      })

      router.push('/pedidos')
      Swal.fire(
        'Correcto',
        'El pedido se registró correctamente',
        'success'
      )
      
    } catch (error) {
      if( error instanceof Error)
      setMensaje( error.message )

      setTimeout(() => {
        setMensaje('')
      },2000)
      
    }
    //nuevoPedido
  }

  const  validarPedido = () => {    
    return !productos.every( producto => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : "";
  }

  const mostrarMensaje = () => {
    return(
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{ mensaje }</p>
      </div>
    )
  }

  return (
    <>
      <div>Crear Nuevo Pedido</div>

      { mensaje && mostrarMensaje() }

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg bg-gray-100 p-10 rounded-xl">
          <NuevoCliente />
          <NuevoProducto />
          <ResumenPedido />
          <Total />

          <button
            onClick={ () => crearNuevoPedido() }
            className={ `bg-gray-500 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer ${validarPedido()}` }
          >REGISTRAR PEDIDO</button>
        </div>
      </div>


    </>
  )
}
