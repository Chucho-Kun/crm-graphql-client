"use client"
import ErrorForm from '@/components/layouts/ErrorForm';
import { NuevoUsuarioResponse, UsuarioInput } from '@/types';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from "yup"

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput){
  nuevoUsuario(input: $input) {
    id
    nombre
    apellido
    email
  }
}
`;

export default function nuevaCuentaPage() {

  const [mensaje, setMensaje] = useState('')
  const router = useRouter()

  const [nuevoUsuario, { loading }] = useMutation<NuevoUsuarioResponse, { input: UsuarioInput }>(NUEVA_CUENTA)

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string().email('El email no es vádido').required('El Email es obligatorio'),
      password: Yup.string().required('El password es obligatorio').min(4, 'El password debe tener al menos 4 caracteres')
    }),
    onSubmit: async valores => {

      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre, apellido, email, password
            }
          }
        });

        if (data?.nuevoUsuario) {
          const { nombre } = data.nuevoUsuario;
          setMensaje(`El usuario ${nombre} fue creado correctamente. Favor de ingresar desde el siguiente formulario`)
          router.push('/login')
        }

      } catch (error) {
        if (error instanceof Error) {
          setMensaje(error.message)
        }
      }
    }
  })

  const { nombre, apellido, email, password } = formik.values
  const { nombre: _nombre, apellido: _apellido, email: _email, password: _password } = formik.errors

  if (loading) return <div>Cargando...</div>

  return (
    <>
      <h1 className='text-white text-center text-2xl font-light'>Crear Nueva Cuenta</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          {mensaje && <ErrorForm msn={mensaje} />}
          <form
            className='bg-white rounded shadow-md px-6 pt-8 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mt-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='nombre'
              >
                Nombre
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                id='nombre'
                placeholder='Nombre de Usuario'
                value={nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <ErrorForm msn={_nombre} />

            <div className='mt-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='apellido'
              >
                Apellido
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                id='apellido'
                placeholder='Apellido de Usuario'
                value={apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <ErrorForm msn={_apellido} />

            <div className='mt-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="email"
                id='email'
                placeholder='Email de Usuario'
                value={email}
                onChange={formik.handleChange}
              />
            </div>
            <ErrorForm msn={_email} />

            <div className='mt-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="password"
                id='password'
                placeholder='Password de Usuario'
                value={password}
                onChange={formik.handleChange}
              />
            </div>
            <ErrorForm msn={_password} />

            <input
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase text-sm hover:bg-gray-600 cursor-pointer'
              value='Crear Cuenta'
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  )
}
