import { gql } from "@apollo/client";

export const NUEVO_CLIENTE = gql`
mutation Mutation($input: ClienteInput) {
  nuevoCliente(input: $input) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`;

export const OBTENER_CLIENTES_VENDEDOR = gql`
query ObtenerClientesVendedor {
  obtenerClientesVendedor {
    id
    nombre
    apellido
    empresa
    email
  }
}`;

export const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!) {
  eliminarCliente(id: $id)
}`;

export const OBTENER_CLIENTE = gql`
query ObtenerCliente($id: ID!) {
  obtenerCliente(id: $id) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}`;

export const ACTUALIZAR_CLIENTE = gql`
mutation ActualizarCliente($id: ID! , $input: ClienteInput) {
  actualizarCliente(id: $id , input: $input ) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}`;