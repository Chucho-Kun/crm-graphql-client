"use client"
import Loader from "@/components/layouts/Loader"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Index() {

  const router = useRouter()

  useEffect(()=> {
    router.push('/clientes');
  },[ router ])

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Bienvenido</h1>
      <div className="mt-20">
        <Loader />
        <p className="text-center">Cargando tu lista de Clientes</p>
      </div>
    </div>
  );
}
