import { buildSchema } from "graphql";
import { productoResolver } from "./Producto/productoResolver";
import { productoSchema } from "./Producto/productoSchema";

export const schema = buildSchema(`
${productoSchema}
`);

export const rootValue = {
  ...productoResolver,
};
