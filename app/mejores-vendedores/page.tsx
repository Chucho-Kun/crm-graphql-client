"use client"
import Loader from '@/components/layouts/Loader';
import { MejoresVendedoresType } from '@/types';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import React, { useEffect, useRef, useState } from 'react';
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

    const { data , loading } = useQuery<MejoresVendedoresType>(MEJORES_VENDEDORES, {
        pollInterval:10000
    })

    const [ grafica , setGrafica ] = useState(false);

    useEffect(()=> {
        if(!data) return;
        console.log('cambio grafica!!!');
        setGrafica( true )
    },[ data ])

    if( !data ) return;

    const { mejoresVendedores } = data;
    const vendedoresGrafica : VendedoresGraficaProps[] = mejoresVendedores.map( vendedor => ({
        ...vendedor.vendedor[0], total: vendedor.total
    }) );   

    if( loading ) return <Loader />
    
    return (
        <>
            <div>
                <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
            </div>

            { grafica && <ResponsiveContainer width="80%" height="80%">
                <BarChart
                    width={500}
                    height={300}
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
            </ResponsiveContainer> }
        </>
    )
}
