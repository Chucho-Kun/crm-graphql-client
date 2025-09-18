import { ELIMINAR_PRODUCTO } from "@/graphql/productos";
import { ObtenerProductosResponse } from "@/types"
import { Reference } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"
import Loader from "../layouts/Loader";

export default function TablaProductos({ obtenerProductos }: ObtenerProductosResponse) {

    const router = useRouter()

    let idEliminado = ''
    const [eliminarProducto, { loading }] = useMutation<{ eliminarProducto: string }>(ELIMINAR_PRODUCTO, {

        update(cache){

            cache.modify({
                fields:{
                    obtenerProductos( existingProducts: ReadonlyArray<Reference> = [], { readField}){
                        return existingProducts.filter( producto => readField('id', producto) !== idEliminado )
                    }
                }
            })
        }
    })

    const borrarProducto = ({ id, nombre }: { id: string, nombre: string }) => {

        idEliminado = id;
        Swal.fire({
            title: "Borrar Producto",
            text: `Deseas eliminar ${nombre}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#b9b9b9",
            confirmButtonText: "Borrar",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const { data } = await eliminarProducto({
                        variables: { id }
                    })

                    // mostrar alerta
                    Swal.fire({
                        title: "Producto Eliminado!",
                        text: data?.eliminarProducto,
                        icon: "success"
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const editarProducto = ( id : string ) => {

        router.push(`/productos/editar/${ id }`)

    }

    if( loading ) return <Loader />

    return (
        <div className='overflow-x-scroll'>

            <table className="table-auto shadow-md mt-10 w-full">
                <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-2/5 py-2">Nombre</th>
                        <th className="w-1/5 py-2">Exitencia</th>
                        <th className="w-1/5 py-2">Precio</th>
                        <th className="w-1/5 py-2"></th>
                        <th className="w-1/5 py-2"></th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {obtenerProductos.map(producto => {

                        const { id, nombre, existencia, precio } = producto

                        return (
                            <tr key={id}>
                                <td className="border border-gray-200 px-4 py-2 text-sm">{nombre}</td>
                                <td className="border border-gray-200 px-4 py-2">{existencia}</td>
                                <td className="border border-gray-200 px-4 py-2">${precio}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => borrarProducto({ id, nombre })}
                                        type='button'
                                        className='flex justify-center items-center bg-red-700 opacity-80 hover:opacity-100 py-2 px-4 w-full text-white rounded cursor-pointer'
                                    >
                                    <span className="hidden md:inline">Eliminar</span>
                                        <div className='ml-0 md:ml-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                    </button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => editarProducto(id)}
                                        type='button'
                                        className='flex justify-center items-center bg-green-700 opacity-80 hover:opacity-100 py-2 px-4 w-full text-white rounded cursor-pointer'
                                    >
                                    <span className="hidden md:inline">Editar</span>
                                        <div className='ml-0 md:ml-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </div>
                                    </button>
                                </td>

                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}
