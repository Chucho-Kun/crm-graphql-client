"use client"
import Loader from "@/components/layouts/Loader"
import TablaProductos from "@/components/productos/TablaProductos"
import { OBTENER_PRODUCTOS } from "@/graphql/productos"
import { ObtenerProductosResponse } from "@/types"
import { useQuery } from "@apollo/client/react"
import Link from "next/link"

export default function productosPage() {

  const { data, loading } = useQuery<ObtenerProductosResponse>(OBTENER_PRODUCTOS, {
    
  })

  if( loading ) return <Loader />

  if( !loading && data?.obtenerProductos ) return (
    <div>

      <div>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      </div>
      <Link
        href='productos/nuevoproducto'
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-xs hover:bg-blue-700 mb-2 uppercase"
      >
        Agregar Nuevo Producto
      </Link>

      <TablaProductos obtenerProductos={ data.obtenerProductos } />
    </div>
  )
}
