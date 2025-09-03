"use client"
import TablaClientes from "@/components/clientes/TablaClientes"
import Loader from "@/components/layouts/Loader"
import { ClientesVendedorResponse } from "@/types"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import Link from "next/link"

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

export default function clientesPage() {

  const { data, loading } = useQuery<ClientesVendedorResponse>(OBTENER_CLIENTES_VENDEDOR )

  if (loading) return <Loader />

  if ( !loading && data?.obtenerClientesVendedor) return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link 
        href='clientes/nuevocliente'
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-xs hover:bg-blue-700 mb-2 uppercase"  
      >
        Nuevo Cliente
      </Link>

      <TablaClientes obtenerClientesVendedor={ data.obtenerClientesVendedor } />
 
    </div>
  )
}
