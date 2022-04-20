import { responseGenerator } from "../../utils/responseGenerator";

export const productoResolver = {
  getListaProductos:  async () => {
    return responseGenerator({ data: ["hola mundo"] });
  },
  getProductosById: async ({ id }) => "holamundo",
  addProducto: async (arg) => "holamundo",
  updateProducto: async (arg) => "holamundo",
  deleteProducto: async ({ id }) => "holamundo",
};
