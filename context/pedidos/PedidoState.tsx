"use client"
import { ReactNode, useReducer } from "react";
import { PedidoContext } from "./PedidoContext";
import { CANTIDAD_PRODUCTOS, ClienteProps, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "@/types";
import PedidoReducer from "./PedidoReducer";

type PedidoStateProps = {
    children: ReactNode
}

export default function PedidoState({ children } : PedidoStateProps ) {

    const initialState = {
        cliente: null,
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

  return (
    <PedidoContext.Provider
        value={{
            agregarCliente
        }}
    >{ children }
    </PedidoContext.Provider>
  )
}
