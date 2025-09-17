"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {

    const pathname = usePathname()
    console.log(pathname);
    

    return (
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white font-bold text-2xl'>CRM Clientes</p>
            </div>

            <nav className='text-white list-none'>
                <Link href="/clientes">
                    <li className={`py-4 p-3 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/" && 'bg-blue-800'}`}>
                        Clientes
                    </li>
                </Link>
                <Link href="/pedidos">
                    <li className={`py-4 p-3 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/pedidos" && 'bg-blue-800'}`}>
                        Pedidos
                    </li>
                </Link>
                <Link href="/productos">
                    <li className={`py-4 p-3 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/productos" && 'bg-blue-800'}`}>
                        Productos
                    </li>
                </Link>

                <div className='sm:mt-10'>
                    <p className='text-white font-bold text-2xl'>Otras Opciones</p>
                </div>

                <Link href="/mejores-vendedores">
                    <li className={`py-4 p-3 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/mejores-vendedores" && 'bg-blue-800'}`}>
                        Mejores Vendedores:
                    </li>
                </Link>
                <Link href="/mejores-clientes">
                    <li className={`py-4 p-3 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/mejores-clientes" && 'bg-blue-800'}`}>
                        Mejores Clientes
                    </li>
                </Link>
            </nav>
        </aside>
    )
}
