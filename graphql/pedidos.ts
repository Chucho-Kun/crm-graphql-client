import { gql } from "@apollo/client";

export const ACTUALIZAR_PEDIDO = gql`
mutation Mutation($id: ID!, $input: PedidoInput) {
  actualizarPedido(id: $id, input: $input) {
    estado
    id
  }
}
`;

export const ELIMINAR_PEDIDO= gql`
mutation EliminarPedido($id: ID!) {
  eliminarPedido(id: $id)
}`

export const OBTENER_PEDIDOS = gql`
query ObtenerPedidosVendedor {
  obtenerPedidosVendedor {
        id
    }
}`;

export const OBTENER_PEDIDOS_VENDEDOR = gql`
query ObtenerPedidosVendedor {
  obtenerPedidosVendedor {
    id
    pedido {
      id
      cantidad
      nombre
    }
    cliente {
      id
      nombre
      apellido
      email
      telefono
    }
    total
    vendedor
    estado
  }
}`;

export const NUEVO_PEDIDO = gql`
mutation NuevoPedido($input: PedidoInput) {
  nuevoPedido(input: $input) {
    id
  }
}`;