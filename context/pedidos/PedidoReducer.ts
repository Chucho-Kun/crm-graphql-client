import { CANTIDAD_PRODUCTOS, ClienteProps, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "@/types";

type PedidoState = {
    cliente: ClienteProps | null;
    productos: any[];
    total: number;
}

type PedidoAction =
    | { type: typeof SELECCIONAR_CLIENTE; payload: ClienteProps };

export default (state: PedidoState, action: PedidoAction) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            };

        // case SELECCIONAR_PRODUCTO:
        //     return {
        //         ...state,
        //         productos: action.payload
        //     };

        // case CANTIDAD_PRODUCTOS:
        //     return {
        //         ...state,
        //         cantidad: action.payload
        //     };

        default:
            return state;
    }
}