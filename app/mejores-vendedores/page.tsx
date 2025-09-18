"use client"
import Loader from '@/components/layouts/Loader';
import { MejoresVendedoresType } from '@/types';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const MEJORES_VENDEDORES = gql`
query MejoresVendedores {
  mejoresVendedores {
    total
    vendedor {
      nombre
      apellido
      email
    }
  }
}`;

type VendedoresGraficaProps = {
    nombre: string
    apellido: string
    email: string
    total: number
}

export default function mejoresVendedoresPage() {

    const [height, setHeight] = useState(300);

    const updateHeight = () => {
        const width = window.innerWidth
        setHeight(width < 640 ? 300 : 500);
    }

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [])

    const { data, loading, refetch } = useQuery<MejoresVendedoresType>(MEJORES_VENDEDORES)

    if( !data ) return;

    const { mejoresVendedores } = data;
    const vendedoresGrafica : VendedoresGraficaProps[] = mejoresVendedores.map( vendedor => ({
        ...vendedor.vendedor[0], total: vendedor.total
    }) );   

    if( loading ) return <Loader />
    
    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
                </div>
                <div>
                    <button 
                        className="bg-blue-800 text-white cursor-pointer p-2 text-xs rounded hover:bg-blue-600 font-bold" type="button"
                        onClick={() => refetch()}
                    >ACTUALIZAR DATOS</button>
                </div>
            </div>

          <ResponsiveContainer className='mt-8' width="80%" height={ height } >
                <BarChart
                    width={500}
                    height={ height }
                    data={vendedoresGrafica}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}
