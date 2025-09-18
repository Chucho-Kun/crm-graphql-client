"use client"
import ErrorForm from "@/components/layouts/ErrorForm";
import Loader from "@/components/layouts/Loader";
import { AutenticarUsuarioInput, AutenticarUsuarioResponse } from "@/types";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input : $input) {
      token
    }
}`;

export default function LoginPage() {

  const router = useRouter()
  const [mensaje, setMensaje] = useState('')
  const [autenticarUsuario, { loading }] = useMutation<AutenticarUsuarioResponse, { input: AutenticarUsuarioInput }>(AUTENTICAR_USUARIO)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: async () => {

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email, password
            }
          }
        })

        if (data?.autenticarUsuario) {
          const { autenticarUsuario: { token } } = data;
          localStorage.setItem('token', token)
          setMensaje('Acceso Correcto')
          setTimeout(() => { router.push('/clientes') }, 1000)
        }

      } catch (error) {
        if (error instanceof Error) {
          setMensaje(error.message);
        }
      }

    }
  })

  const { email, password } = formik.values
  const { email: _email, password: _password } = formik.errors

  if (loading) return <Loader />

  return (
    <>
      <h1 className='text-white text-center text-2xl font-light'>Login</h1>
      <div className="text-center text-blue-300 mt-5">
        <div className="text-white">Email de Pruebas:</div>
        <div>chu@chu.com.mx</div>
        <div>123123</div>
      </div>
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
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="email"
                id='email'
                placeholder='Email de Usuario'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={email}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={password}
              />
            </div>
            <ErrorForm msn={_password} />

            <input
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase text-sm hover:bg-gray-600 cursor-pointer'
              value='Iniciar Sesión'
              type="submit"
            />
          </form>

          <Link href='/login/nuevacuenta' className='text-white opacity-60 hover:opacity-100 align-middle flex justify-center' >
            ¿No tienes cuenta? crea una
          </Link>

        </div>
      </div>
    </>
  )
}
