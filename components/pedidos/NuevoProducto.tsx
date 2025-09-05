import { InputProducto, ObtenerProductosResponse } from '@/types'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import React, { useContext, useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import Loader from '../layouts/Loader'
import { PedidoContext } from '@/context/pedidos/PedidoContext'

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

export default function NuevoProducto() {

    const pedidocontext = useContext(PedidoContext)
    if (!pedidocontext) return
    const { agregarProducto } = pedidocontext

    const [productos, setProductos] = useState<MultiValue<InputProducto>>([])

    useEffect(() => {
        agregarProducto([...productos])
    }, [productos])

    const { data, loading } = useQuery<ObtenerProductosResponse>(OBTENER_PRODUCTOS)
    if (!data) return;
    const { obtenerProductos } = data

    const seleccionarProducto = (producto: MultiValue<InputProducto>) => {
        if (!producto) return
        setProductos(producto)
    }

    if (loading) return <Loader />

    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                2.- Asignar un Producto
            </p>

            <Select
                className="mt-3"
                options={obtenerProductos}
                onChange={item => seleccionarProducto(item)}
                isMulti={true}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.nombre} - ${options.existencia} pzas`}
                placeholder="Buscar un croducto"
                noOptionsMessage={() => 'No se encontraron resultados'}
            />

        </>
    )
}
