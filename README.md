# FullStack Platform GraphQL NEXT / REACT / TypeScript [ Client ]
Customer CRM in React that works with GraphQL, shows sections of customers, products and orders that can be edited like a CRUD app, also shows a graph of which sellers and which customers have sold the most
## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-006400?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-00008b?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-6f4905?style=for-the-badge&logo=tailwindcss)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql)
![Formik](https://img.shields.io/badge/Formik-EF5B5B?style=for-the-badge&logo=formik)
![Yup](https://img.shields.io/badge/Yup-4B5563?style=for-the-badge)

## Technologies
Next + React + Typescript + TailwindCSS + GraphQL + ApolloClient + Formik + Yup
<img width="1320" height="493" alt="Captura de Pantalla 2025-09-18 a la(s) 16 43 25" src="https://github.com/user-attachments/assets/3e2952ef-df51-4b7c-ba19-a1e54082b8cb" />
<img width="1173" height="728" alt="Captura de Pantalla 2025-09-18 a la(s) 16 43 53" src="https://github.com/user-attachments/assets/1ce403a4-aa34-43f2-9ec7-4c3022a7b8b5" />
<img width="1168" height="526" alt="Captura de Pantalla 2025-09-18 a la(s) 16 44 06" src="https://github.com/user-attachments/assets/d58cc5d0-e4be-4686-b51d-0800232b6360" />
<img width="1165" height="508" alt="Captura de Pantalla 2025-09-18 a la(s) 16 44 34" src="https://github.com/user-attachments/assets/e112fc78-77dd-4ac5-a30d-ad13952258a7" />

## Developer Notes
### Config to clear cache
### config/apollo.ts
```
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

const authLink = new SetContextLink((prevContext, operation) => {
  if (typeof window === "undefined") return prevContext;

  const token = localStorage.getItem('token');
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? token : "",
    }
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        obtenerClientesVendedor: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return [...incoming];
          }
        },
        obtenerPedidosVendedor: {
          keyArgs: false, // ✅ indica que no hay argumentos que distingan esta query
          merge(existing = [], incoming: any[]) {
            return incoming; // ✅ reemplaza de forma segura sin perder normalización
          }
        },
        obtenerProductos: {
          keyArgs: false,
          merge(existing = [], incoming: any[]) {
            return incoming;
          }
        }
      }
    },
    Cliente: {
      keyFields: ['id']
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;
```
### Correct form to use GraphQL 
### app/clientes/editar/[id]
```
import { InputProducto, ObtenerProductosResponse } from '@/types'
import { useQuery } from '@apollo/client/react'
import React, { useContext, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import Loader from '../layouts/Loader'
import { PedidoContext } from '@/context/pedidos/PedidoContext'
import { OBTENER_PRODUCTOS } from '@/graphql/productos'

export default function NuevoProducto() {

    const pedidocontext = useContext(PedidoContext)

    const [ _, setProductos ] = useState<MultiValue<InputProducto>>([])

    const { data, loading } = useQuery<ObtenerProductosResponse>(OBTENER_PRODUCTOS)

    if (!data) return;
    const { obtenerProductos } = data

    const seleccionarProducto = (producto: MultiValue<InputProducto>) => {
        if (!producto || !pedidocontext) return
        setProductos(producto)
        pedidocontext.agregarProducto([...producto])
    }

    if (loading) return <Loader />

    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                2.- Asignar un Producto
            </p>

            <Select
                className="mt-3"
                options={obtenerProductos}
                onChange={item => seleccionarProducto(item)}
                isMulti={true}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.nombre} - ${options.existencia} pzas`}
                placeholder="Buscar un croducto"
                noOptionsMessage={() => 'No se encontraron resultados'}
            />

        </>
    )
}

```
#### Localhost
```
npm run dev
```
#### Deploying project
```
npm run build
```
