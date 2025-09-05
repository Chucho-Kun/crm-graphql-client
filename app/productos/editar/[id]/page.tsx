"use client"
import ErrorForm from '@/components/layouts/ErrorForm';
import Loader from '@/components/layouts/Loader';
import { ActualizaProductoResponse, InputProducto, ObtenerProductoResponse, ObtenerProductosResponse } from '@/types';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { Formik } from 'formik';
import { notFound, useParams, useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import * as Yup from 'yup'

const OBTENER_PRODUCTOS = gql`
query ObtenerProductos {
  obtenerProductos {
    nombre
    existencia
    precio
  }
}`;

const OBTENER_PRODUCTO = gql`
query ObtenerProducto($id: ID) {
  obtenerProducto(id: $id) {
    id
    nombre
    existencia
    precio
  }
}`;

const ACTUALIZAR_PRODUCTO = gql`
mutation ActualizaProducto($id: ID, $input: ProductoInput) {
  actualizaProducto(id: $id, input: $input) {
    nombre
    existencia
    precio
  }
}`;

export default function EditarProductoPage() {

    const { id } = useParams()
    const router = useRouter()

    const { data, loading } = useQuery<ObtenerProductoResponse>(OBTENER_PRODUCTO, {
        variables: { id }
    })

    const [actualizaProducto] = useMutation<ActualizaProductoResponse>(ACTUALIZAR_PRODUCTO , {

        update( cache , { data } ){
            if(!data?.actualizaProducto) return;

            const productoActualizado = data.actualizaProducto;

            const existingData = cache.readQuery<ObtenerProductosResponse>({ query : OBTENER_PRODUCTOS })

            if( !existingData ) return;

            const productosActualizados = existingData.obtenerProductos.map( producto => producto.id === productoActualizado.id ? productoActualizado : producto )

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: productosActualizados
                }
            });
            
        }

    })

    const actualizarInfoProducto = async (valores: InputProducto) => {

        console.log('actualizarInfoProducto()', { valores });
        const { id, nombre, existencia, precio } = valores

        try {
            await actualizaProducto({
                variables: {
                    id, input: {
                        nombre, existencia, precio
                    }
                }
            })

            Swal.fire({
                title: "Producto Actualizado",
                text: `Se actualizaron correctamente los datos del producto`,
                icon: "success"
            })
            router.push('/productos');

        } catch (error) {
            console.log(error);
        }
    }

    const schemaValidacion = Yup.object({
        nombre: Yup.string()
            .required('Favor de agregar el nombre del producto'),
        existencia: Yup.number()
            .required('Favor de asignar disponibiliad')
            .positive('La cantidad no puede ser negativa')
            .integer('La cantidad debe ser en números enteros'),
        precio: Yup.number()
            .required('Favor de colocar el precio')
            .positive('El precio debe ser un número positivo')
    })

    if (loading) return <Loader />

    if (!data) return notFound() ;
    const { obtenerProducto } = data;

    if( !loading && data ) return (
        <div>
            <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        initialValues={obtenerProducto}
                        validationSchema={schemaValidacion}
                        onSubmit={(valores) => {
                            actualizarInfoProducto(valores)
                        }}
                    >
                        {formik => {

                            const { nombre, existencia, precio } = formik.values
                            const { nombre: nombre_, existencia: existencia_, precio: precio_ } = formik.errors

                            return (
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={formik.handleSubmit}
                                >

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre del producto:
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            id="nombre"
                                            name='nombre'
                                            type="text"
                                            placeholder="Nombre del producto"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={nombre}
                                        />
                                    </div>
                                    <ErrorForm msn={nombre_} />

                                    <div className="flex gap-4 mb-4">
                                        <div className="w-1/2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                                Existencia:
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                id="existencia"
                                                name='existencia'
                                                type="number"
                                                placeholder="Cantidad disponible"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={existencia}
                                            />
                                            <ErrorForm msn={existencia_} />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                                Precio:
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                id="precio"
                                                type="number"
                                                name='precio'
                                                placeholder="Precio del producto"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={precio}
                                            />
                                            <ErrorForm msn={precio_} />
                                        </div>
                                    </div>


                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 py-4 text-white uppercase hover:bg-gray-600 cursor-pointer rounded font-bold text-xs"
                                        value="Actualizar Producto"
                                    />

                                </form>
                            )}
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}
