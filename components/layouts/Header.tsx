"use client"
import { ObtenerUsuarioResponse } from "@/types";
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;

export default function Header() {

    const { data , loading } = useQuery<ObtenerUsuarioResponse>(OBTENER_USUARIO , { fetchPolicy: 'no-cache' })
    const router = useRouter()    

    useEffect( () => {
        if( !loading && !data?.obtenerUsuario ){ router.push('/login')}
    },[ loading , data , router])

    if (!data?.obtenerUsuario) return null;

    const { id, nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div className="flex justify-between mb-6">
            <p key={id} className="mr-2">Hola: {nombre} {apellido}</p>
            <button 
                className="bg-blue-800 text-white cursor-pointer p-2 text-xs rounded hover:bg-blue-600 font-bold" 
                type="button"
                onClick={ cerrarSesion }
            >
                Cerrar Sesión
            </button>
        </div>
    )
}
