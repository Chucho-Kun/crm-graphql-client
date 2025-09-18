"use client"
import Loader from '@/components/layouts/Loader';
import { MejoresClientesType } from '@/types';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MEJORES_CLIENTES = gql`
query MejoresClientes {
  mejoresClientes {
    total
    cliente {
      id
      nombre
      apellido
    }
  }
}`;

type ClientesGraficaProps = {
    nombre: string
    id: string
    apellido: string
    total: number
}

export default function MejoresClientesPage() {
    
    const [ height , setHeight ] = useState(300);
    
    const updateHeight = () => {
       const width = window.innerWidth
       setHeight( width < 640 ? 300 : 500 );
    }

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [])
    
    const { data , loading , refetch } = useQuery<MejoresClientesType>( MEJORES_CLIENTES )

    if( !data ) return;

    const { mejoresClientes } = data;
    const clientesGrafica : ClientesGraficaProps[] = mejoresClientes.map( cliente => ({
        ...cliente.cliente[0], total: cliente.total
    }) );    
    
    if( loading ) return <Loader />
    
    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>
                </div>
                <div>
                    <button 
                        className="bg-blue-800 text-white cursor-pointer p-2 text-xs rounded hover:bg-blue-600 font-bold" type="button"
                        onClick={() => refetch()}
                    >ACTUALIZAR DATOS</button>
                </div>
            </div>

          <ResponsiveContainer className='mt-8' width={ '100%' } height={ height }>
                <BarChart
                    width={500}
                    height={height}
                    data={ clientesGrafica }
                    margin={{
                        top: 5,
                        right: 30,
                        left: 5,
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
