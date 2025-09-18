"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {

    const pathname = usePathname()    

    return (
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white font-bold text-2xl'>CRM Clientes</p>
            </div>

            <nav className='text-white list-none'>                
                    <li>
                        <Link 
                            className={`block w-full py-4 pl-4 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/clientes" && 'bg-blue-800'}`} 
                            href="/clientes"
                        > Clientes 
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`block w-full py-4 pl-4 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/pedidos" && 'bg-blue-800'}`}  
                            href="/pedidos"
                        > Pedidos 
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`block w-full py-4 pl-4 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/productos" && 'bg-blue-800'}`}  
                            href="/productos"
                        > Productos 
                        </Link>
                    </li>
                <div className='sm:mt-10'>
                    <p className='text-white font-bold text-2xl'>Otras Opciones</p>
                </div>
                    <li>
                        <Link 
                            className={`block w-full py-4 pl-4 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/mejores-vendedores" && 'bg-blue-800'}`}  
                            href="/mejores-vendedores"
                            > Mejores Vendedores: 
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className={`block w-full py-4 pl-4 hover:bg-blue-600 transition-colors duration-300 ${pathname == "/mejores-clientes" && 'bg-blue-800'}`}  
                            href="/mejores-clientes"
                            > Mejores Clientes: 
                        </Link>
                    </li>
                    
            </nav>
        </aside>
    )
}
