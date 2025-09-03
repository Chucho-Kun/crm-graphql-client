"use client"
import ErrorForm from "@/components/layouts/ErrorForm";
import Loader from "@/components/layouts/Loader";
import { NuevoProductoResponse, ObtenerProductosResponse, ProductoInput } from "@/types";
import { gql, Reference } from "@apollo/client"
import { useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import * as Yup from "yup"

const NUEVO_PRODUCTO = gql`
mutation NuevoProducto($input: ProductoInput) {
  nuevoProducto(input: $input) {
    id
    nombre
    existencia
    precio
  }
}`;

const OBTENER_PRODUCTOS = gql`
query ObtenerProductos {
  obtenerProductos {
    id
    nombre
    existencia
    precio
  }
}`

export default function nuevoProductoPage() {

    const router = useRouter()

    const [ nuevoProducto, { loading } ] = useMutation<NuevoProductoResponse, { input: ProductoInput }>(NUEVO_PRODUCTO, {

        update( cache , { data } ){
            if( !data?.nuevoProducto )return;
            const { nuevoProducto } = data

            const existCache = cache.readQuery<ObtenerProductosResponse>({ query : OBTENER_PRODUCTOS})
            if(!existCache)return;

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos: [...existCache.obtenerProductos , nuevoProducto]
                }
            })
        } 
    })

    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('Favor de agregar el nombre del producto'),
            existencia: Yup.number()
                .required('Favor de asignar disponibiliad')
                .positive('La cantidad no puede ser negativa')
                .integer('La cantidad debe ser en números enteros'),
            precio: Yup.number()
                .required('Favor de colocar el precio')
                .positive('El precio debe ser un número positivo')
        }),
        onSubmit: async input => {

            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input
                    }
                })

                if (data) {

                    Swal.fire({
                        title: "Producto Agregado",
                        text: `Se agregó ${input.nombre} correctamente`,
                        icon: "success"
                    })
                    router.push('/productos');

                }

            } catch (error) {
                console.log(error);
            }
        }
    })

    const { nombre, existencia, precio } = formik.values
    const { nombre: nombre_, existencia: existencia_, precio: precio_ } = formik.errors

    if (loading) return <Loader />

    return (
        <div>
            <h1 className="text-2xl text-gray-800 font-light">Subir Nuevo Producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    {/* { mensaje && <ErrorForm msn={ mensaje } /> } */}
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
                            value="Agregar Nuevo Producto"
                        />

                    </form>
                </div>
            </div>
        </div>
    )
}
