export const productoSchema = `
type Query{
    getListaProductos:listaProductosResponse
    getProductosById(id:Int!):String
}
type Mutation{
    addProducto(data:inputNewProducto!):String
    updateProducto(data:updateDataProducto!):String
    deleteProducto(id:Int!):String
}
type listaProductosResponse {
    message: String
    status: String
    data: [String]
}
input inputNewProducto {
    title: String
    price : Int
    tumbnails : String
}
input updateDataProducto {
    title: String
    price : Int
    tumbnails : String
    id : Int!
}
`;
