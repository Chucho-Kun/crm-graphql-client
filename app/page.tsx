"use client"
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
    </div>
  )
}
