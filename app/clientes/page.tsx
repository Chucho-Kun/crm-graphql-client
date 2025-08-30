"use client"
import Loader from "@/components/layouts/Loader"
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

  const { data, loading } = useQuery<ClientesVendedorResponse>(OBTENER_CLIENTES_VENDEDOR , { fetchPolicy: 'no-cache' })

  if (loading) return <Loader />

  if ( !loading && data?.obtenerClientesVendedor) return (
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
          {data.obtenerClientesVendedor.map(cliente => (
            <tr key={cliente.id}>
              <td className="border border-gray-200 px-4 py-2">{cliente.nombre} {cliente.apellido}</td>
              <td className="border border-gray-200 px-4 py-2">{cliente.empresa}</td>
              <td className="border border-gray-200 px-4 py-2">{cliente.email}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
