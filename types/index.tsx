export type UsuarioInput = {
    nombre: string
    apellido: string
    email: string
    password: string
}

export type NuevoUsuarioResponse = {
    nuevoUsuario: {
        id: string
        nombre: string
        apellido: string
        email: string
    }
}

export type AutenticarUsuarioInput = {
    email: string
    password: string
}

export type AutenticarUsuarioResponse = {
    autenticarUsuario: {
        token: string
    }
}

export type ClientesVendedorResponse = {
    obtenerClientesVendedor: {
        nombre: string
        apellido: string
        empresa: string
        email: string
        id: string
        vendedor: string
    }[]
}

export type ObtenerUsuarioResponse = {
    obtenerUsuario: {
        id: string
        nombre: string
        apellido: string
    }
}

export type NuevoClienteResponse = {
    nuevoCliente: {
        id: string
        nombre: string
        apellido: string
        empresa: string
        email: string
        telefono: string
    }
}

export type InputCliente = Pick<NuevoClienteResponse['nuevoCliente'], 'nombre' | 'apellido' | 'email' | 'empresa' | 'telefono'>

export type ObtenerClienteResponse = {
    obtenerCliente: {
        id: string
        nombre: string
        apellido: string
        empresa: string
        email: string
        telefono: string
    }
}

export type ActualizaClienteResponse = {
    actualizarCliente: {
        id: string
        nombre: string
        apellido: string
        empresa: string
        email: string
        telefono: string
    }
}

export type ActualizarClienteProps = Pick<ActualizaClienteResponse['actualizarCliente'], 'id' | 'nombre' | 'apellido' | 'empresa' | 'email' | 'telefono'>

export type ObtenerProductosResponse = {
    obtenerProductos: {
        id: string
        nombre: string
        existencia: string
        precio: string
        creado: string
    }[]
}

export type ObtenerProductoResponse = {
    obtenerProducto: {
        id: string
        nombre: string
        existencia: string
        precio: string
        creado: string
    }
}

export type NuevoProductoResponse = {
    nuevoProducto: {
        id: string
        nombre: string
        existencia: string
        precio: string
    }
}

export type ProductoInput = Pick<NuevoProductoResponse['nuevoProducto'], 'nombre' | 'existencia' | 'precio' >

export type ActualizaProductoResponse = {
    actualizaProducto: {
        id: string
        nombre: string
        existencia: string
        precio: string
    }
}

export type InputProducto = Pick<ActualizaProductoResponse['actualizaProducto'], 'nombre' | 'existencia' | 'precio' | 'id'>