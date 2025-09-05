import { PedidoContext } from "@/context/pedidos/PedidoContext";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useContext, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import Loader from "../layouts/Loader";
import { ClienteProps, ClientesVendedorResponse } from "@/types";

export const OBTENER_CLIENTES_VENDEDOR = gql`
query ObtenerClientesVendedor {
  obtenerClientesVendedor {
    id
    nombre
    apellido
    empresa
    email
    vendedor
  }
}`;

export default function NuevoCliente() {
  
  const [cliente, setCliente] = useState<SingleValue<ClienteProps>>(null)

  // context de pedidos
  const pedidocontext = useContext( PedidoContext )
  if( !pedidocontext )return;
  
  const { agregarCliente } = pedidocontext
  
  const { data , loading } = useQuery<ClientesVendedorResponse>(OBTENER_CLIENTES_VENDEDOR)
  console.log(data);
  
  useEffect(() => {
    if( cliente ){
      agregarCliente( cliente )
    }
  }, [cliente])

  const opt = (options: SingleValue<ClienteProps>) => {
    console.log(options);
    if (!options) return
    setCliente(options)
  }

  // const pedidocontext = useContext(PedidoContext)
  // console.log({ pedidocontext });

  if(loading) return <Loader />
  if( !data?.obtenerClientesVendedor ) return;
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
        getOptionLabel={options => options.nombre}
        placeholder="Buscar un cliente"
        noOptionsMessage={() => 'No se encontraron resultados'}
      />

    </>
  )
}
