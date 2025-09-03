"use client"
import ErrorForm from "@/components/layouts/ErrorForm";
import Loader from "@/components/layouts/Loader";
import { ClientesVendedorResponse, InputCliente, NuevoClienteResponse } from "@/types";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useFormik } from "formik"
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup"
import { ObtenerUsuarioResponse } from '../../../types/index';

const NUEVO_CLIENTE = gql`
mutation Mutation($input: ClienteInput) {
  nuevoCliente(input: $input) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`;

const OBTENER_CLIENTES_VENDEDOR = gql`
query ObtenerClientesVendedor {
  obtenerClientesVendedor {
    id
    nombre
    apellido
    empresa
    email
  }
}`;

export default function NuevosClientesPage() {

  const router = useRouter();
  const [ mensaje , setMensaje ] = useState('')

  const [ nuevoCliente , { loading } ] = useMutation<NuevoClienteResponse, { input : InputCliente }>( NUEVO_CLIENTE , {
    update( cache , { data } ){
      if(!data?.nuevoCliente) return;

      const nuevo = data.nuevoCliente;

      // objeto de cache a actualizar
      const dataResponse = cache.readQuery<ClientesVendedorResponse>({query: OBTENER_CLIENTES_VENDEDOR})

      if(!dataResponse) return;

      const { obtenerClientesVendedor } = dataResponse
    
      // reescribir cache, el cache se debe reescribir
      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
        data:{
          obtenerClientesVendedor: [...obtenerClientesVendedor , nuevo]
        }
      })
    }
  } );

  const formik = useFormik({
    initialValues:{
      nombre: '',   
      apellido: '',
      empresa: '',
      email: '',
      telefono: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre del cliente es obligatorio'),
      apellido: Yup.string()
        .required('El apellido es obligatario'),
      empresa: Yup.string()
        .required('La empresa es obligatoria'),
      email: Yup.string()
        .email('Email no válido')
        .required('El email es obligatario')
    }),
    onSubmit: async valores => {
      
      const { nombre , apellido , empresa , email , telefono  } = valores

      try {

        const { data } = await nuevoCliente({
          variables:{
            input:{
              nombre, apellido, empresa, email, telefono
            }
          }
        })

        if(data){
          console.log(data.nuevoCliente);
          setMensaje( `Se ha registrado correctamente a ${ nombre } ${ apellido}` )
          setTimeout(() => {  router.push('/clientes')  },1000)
                 
        }

      } catch (error) {
        if( error instanceof Error){
          setMensaje(error.message)
          setTimeout(() => { setMensaje('') },2000)
        }
      }
    }
  })

  const { nombre , apellido , empresa , email } = formik.errors
  if( loading ) return <Loader/>

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          { mensaje && <ErrorForm msn={ mensaje } /> }
          <form 
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="nombre"
                type="text"
                placeholder="Nombre del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>
            <ErrorForm msn={nombre} />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="apellido"
                type="text"
                placeholder="Apellido del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </div>
            <ErrorForm msn={apellido} />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                Empresa:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="empresa"
                type="text"
                placeholder="Empresa del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
            </div>
            <ErrorForm msn={empresa} />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="email"
                type="email"
                placeholder="Email del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <ErrorForm msn={email} />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="telefono"
                type="tel"
                placeholder="Teléfono del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>

            <input 
              type="submit" 
              className="bg-gray-800 w-full mt-5 py-4 text-white uppercase hover:bg-gray-600 cursor-pointer rounded font-bold text-xs"
              value="Registrar cliente"
            />

          </form>
        </div>
      </div>
    </div>
  )
}
