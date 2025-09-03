"use client"
import ErrorForm from '@/components/layouts/ErrorForm';
import Loader from '@/components/layouts/Loader';
import { ActualizaClienteResponse, ActualizarClienteProps, ObtenerClienteResponse } from '@/types';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import * as Yup from 'yup'

const OBTENER_CLIENTE = gql`
query ObtenerCliente($id: ID!) {
  obtenerCliente(id: $id) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}`;

const ACTUALIZAR_CLIENTE = gql`
mutation ActualizarCliente($id: ID! , $input: ClienteInput) {
  actualizarCliente(id: $id , input: $input ) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}`;

export default function EditarClientePage() {

  const { id } = useParams()
  const router = useRouter()

  const { data, loading, error } = useQuery<ObtenerClienteResponse>(OBTENER_CLIENTE, {
    variables: { id }
  })

  const [ actualizarCliente ] = useMutation<ActualizaClienteResponse>(ACTUALIZAR_CLIENTE, {

  })

  const schemaValidacion = Yup.object({
    nombre: Yup.string()
      .required('El nombre del cliente es obligatorio'),
    apellido: Yup.string()
      .required('El apellido del cliente es obligatorio'),
    empresa: Yup.string()
      .required('La empresa es obligatoria'),
    email: Yup.string()
      .email('Email no válido')
      .required('El email del cliente es obligatorio'),
    telefono: Yup.string()
  })

  if (loading) return <Loader />

  if (!data) return;
  const { obtenerCliente } = data;

  const actualizarInfoCliente = async (valores : ActualizarClienteProps) => {
    const { id , nombre, apellido , empresa , email , telefono } = valores

    try {
      
      await actualizarCliente({
        variables:{ id , input:{
          nombre, apellido , empresa , email , telefono
        } }
      })

       Swal.fire({
                  title: "Cliente Actualizado",
                  text: `Se actualizaron correctamente los datos del cliente`,
                  icon: "success"
              })
      router.push('/clientes');
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            initialValues={obtenerCliente}
            validationSchema={schemaValidacion}
            onSubmit={( valores ) => { 
              actualizarInfoCliente( valores )
             }}
          >
            {formik => {

              const { nombre, apellido, empresa, email, telefono } = formik.values
              const { nombre: nombre_, apellido: apellido_, empresa: empresa_, email: email_ } = formik.errors

              return (
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
                      name='nombre'
                      type="text"
                      placeholder="Nombre del cliente"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={nombre}
                    />
                  </div>
                  <ErrorForm msn={nombre_} />

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
                      value={apellido}
                    />
                  </div>
                  <ErrorForm msn={apellido_} />

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
                      value={empresa}
                    />
                  </div>
                  <ErrorForm msn={empresa_} />

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
                      value={email}
                    />
                  </div>
                  <ErrorForm msn={email_} />

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
                      value={telefono}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 py-4 text-white uppercase hover:bg-gray-600 cursor-pointer rounded font-bold text-xs"
                    value="Actualizar Cliente"
                  />

                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}
