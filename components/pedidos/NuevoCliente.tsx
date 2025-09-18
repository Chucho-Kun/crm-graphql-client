import { PedidoContext } from "@/context/pedidos/PedidoContext";
import { useQuery } from "@apollo/client/react";
import { useContext, useState } from "react";
import Select, { SingleValue } from "react-select";
import Loader from "../layouts/Loader";
import { ClienteProps, ClientesVendedorResponse } from "@/types";
import { OBTENER_CLIENTES_VENDEDOR } from "@/graphql/clientes";

export default function NuevoCliente() {
  
  // context de pedidos
  const pedidocontext = useContext( PedidoContext )
  
  const { data , loading } = useQuery<ClientesVendedorResponse>(OBTENER_CLIENTES_VENDEDOR)
  const [ _, setCliente] = useState<SingleValue<ClienteProps>>(null)
  
  if( !pedidocontext )return;
  if(loading) return <Loader />
  
  if( !data?.obtenerClientesVendedor ) return;
  
  const opt = (options: SingleValue<ClienteProps>) => {
    if (!options || !pedidocontext) return
    setCliente(options)
    pedidocontext.agregarCliente( options )
  }

  const { obtenerClientesVendedor } = data
  return (
    <>
      <p
        className="mt-5 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un Cliente al pedido
      </p>

      <Select
        className="mt-3"
        options={obtenerClientesVendedor}
        onChange={sabor => opt(sabor)}
        getOptionValue={options => options.id}
        getOptionLabel={options => options.nombre+' '+options.apellido}
        placeholder="Buscar un cliente"
        noOptionsMessage={() => 'No se encontraron resultados'}
      />

    </>
  )
}
