import { CANTIDAD_PRODUCTOS, ClienteProps, InputProducto , NuevoProductoType, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "@/types";

type PedidoState = {
    cliente: ClienteProps | null ;
    productos: any[];
    total: number;
}

type PedidoAction =
    | { type: typeof SELECCIONAR_CLIENTE; payload: ClienteProps }
    | { type: typeof SELECCIONAR_PRODUCTO; payload: InputProducto[] }
    | { type: typeof CANTIDAD_PRODUCTOS; payload: NuevoProductoType };

export default (state: PedidoState, action: PedidoAction) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            };

        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            };

        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map( producto =>  producto.id === action.payload.id ? producto = action.payload : producto )
            };

        default:
            return state;
    }
}