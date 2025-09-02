import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import Loader from '../layouts/Loader';
import { ClientesVendedorResponse } from '@/types';

type TablaClientesProps = {
    data: {
        nombre: string;
        apellido: string;
        empresa: string;
        email: string;
        id: string;
        vendedor: string;
    }[]
}

type ClientesType = {
    id: string
    nombre: string
    apellido: string
}

const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!) {
  eliminarCliente(id: $id)
}`;

const OBTENER_CLIENTES_VENDEDOR = gql`
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

export default function TablaClientes({ data }: TablaClientesProps) {

        let idEliminado = '';        
        const [ eliminarCliente ] = useMutation<{ eliminarCliente: string },{ id: string }>(ELIMINAR_CLIENTE , {
            update( cache ){

                const dataResponse = cache.readQuery<ClientesVendedorResponse>({ query: OBTENER_CLIENTES_VENDEDOR })

                if(!dataResponse) return;

                const nuevosClientes = dataResponse.obtenerClientesVendedor.filter( cliente => cliente.id !== idEliminado )
                
                cache.writeQuery({
                    query: OBTENER_CLIENTES_VENDEDOR,
                    data:{
                        obtenerClientesVendedor: nuevosClientes
                    }
                })
            }
        }) 


    const avisoBorrar = ({ id, nombre, apellido }: ClientesType) => {        

        idEliminado = id;

        Swal.fire({
            title: "Borrar Cliente",
            text: `Deseas borrar a ${ nombre } ${ apellido }?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#b9b9b9",
            confirmButtonText: "Borrar",
            reverseButtons: true
        }).then( async (result) => {
            if (result.isConfirmed) {

                try {
                    const { data } = await eliminarCliente({
                        variables: { id }
                    })

                    // mostrar alerta
                    Swal.fire({
                        title: "Borrado!",
                        text: data?.eliminarCliente,
                        icon: "success"
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        });


    }

    return (
        <table className="table-auto shadow-md mt-10 w-full">
            <thead className="bg-gray-800">
                <tr className="text-white">
                    <th className="w-1/5 py-2">Nombre</th>
                    <th className="w-1/5 py-2">Empresa</th>
                    <th className="w-1/5 py-2">Email</th>
                    <th className="w-1/5 py-2">Acciones</th>
                </tr>
            </thead>

            <tbody className="bg-white">
                {data.map(cliente => {
                    const { id, nombre, apellido, empresa, email } = cliente
                    return (
                        <tr key={id}>
                            <td className="border border-gray-200 px-4 py-2">{nombre} {apellido}</td>
                            <td className="border border-gray-200 px-4 py-2">{empresa}</td>
                            <td className="border border-gray-200 px-4 py-2">{email}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <XCircleIcon
                                    className='w-8 h-8 text-blue-800 opacity-60 hover:opacity-100 cursor-pointer'
                                    onClick={() => avisoBorrar({ id, nombre, apellido })}
                                />
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody>

        </table>
    )
}