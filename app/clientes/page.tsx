"use client"
import { ClientesVendedorResponse } from "@/types"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

const OBTENER_CLIENTES_VENDEDOR = gql`
query obtenerClientesVendedor{
  obtenerClientesVendedor {
    nombre
    apellido
    empresa
    email
    id
    vendedor
  }
}
`

export default function clientesPage() {

  const { data, loading, error } = useQuery<ClientesVendedorResponse>(OBTENER_CLIENTES_VENDEDOR)

  //const { obtenerClientesVendedor : { nombre } } = data

  console.log({ data });
  console.log({ error });

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

      <table className="table-auto shadow-md mt-10 w-full">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empres</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          { data.obte }
        </tbody>
      </table>
    </div>
  )
}
