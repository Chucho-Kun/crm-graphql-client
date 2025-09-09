"use client"
import { ReactNode, useReducer } from "react";
import { PedidoContext } from "./PedidoContext";
import { ACTUALIZA_TOTAL, CANTIDAD_PRODUCTOS, ClienteProps, InputProducto, NuevoProductoType, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "@/types";
import PedidoReducer from "./PedidoReducer";

type PedidoStateProps = {
    children: ReactNode
}

export default function PedidoState({ children } : PedidoStateProps ) {

    const initialState = {
        cliente: [],
        productos: [],
        total: 0
    }

    const [ state , dispatch ] = useReducer( PedidoReducer , initialState )

    // modifica cliente
    const agregarCliente = ( cliente: ClienteProps ) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // modifica productos
    const agregarProducto = (seleccionados : InputProducto[]) => {
        
        let nuevoState;
        if( state.productos.length > 0 ){
            // Tomar del segundo arreglo la copia para asignarlo al primero
            nuevoState = seleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id )
                return { ...producto, ...nuevoObjeto }
            } )
        }else{
            nuevoState = seleccionados;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    } 

    // modifica las cantidades de los productos
    const cantidadProductos = (nuevoProducto : NuevoProductoType ) => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizaTotal = () => {
        dispatch({
            type: ACTUALIZA_TOTAL
        })
        
    }

  return (
    <PedidoContext.Provider
        value={{
            productos: state.productos,
            total: state.total,
            cliente: state.cliente,
            agregarCliente,
            agregarProducto,
            cantidadProductos,
            actualizaTotal
        }}
    >{ children }
    </PedidoContext.Provider>
  )
}
