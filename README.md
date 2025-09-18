# FullStack Platform GraphQL NEXT / REACT / TypeScript
## Client
## Technologies
Next + React + Typescript + TailwindCSS + GraphQL + ApolloClient + Formik + Yup
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
