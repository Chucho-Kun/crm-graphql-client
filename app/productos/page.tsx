"use client"
import Loader from "@/components/layouts/Loader"
import TablaProductos from "@/components/productos/TablaProductos"
import { ObtenerProductosResponse } from "@/types"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import Link from "next/link"

const OBTENER_PRODUCTOS = gql`
query ObtenerProductos {
  obtenerProductos {
    id
    nombre
    existencia
    precio
    creado
  }
}`

export default function productosPage() {

  const { data, loading, error } = useQuery<ObtenerProductosResponse>(OBTENER_PRODUCTOS)

  console.log(data);

  if( loading ) return <Loader />

  if( !loading && data?.obtenerProductos ) return (
    <div>

      <div>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      </div>
      <Link
        href='clientes/nuevocliente'
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-xs hover:bg-blue-700 mb-2 uppercase"
      >
        Agregar Nuevo Producto
      </Link>

      <TablaProductos obtenerProductos={ data.obtenerProductos } />
    </div>
  )
}
