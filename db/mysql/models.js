import { DataTypes } from "sequelize";
import { dbActivame, dbValecart } from "..";
import { ModelMySQL } from "./config";

export const PuntoVenta = {
  name: "punto_venta",
  schema: {
    id_punto_venta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_codigo: { type: DataTypes.STRING },
    sucursal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  options: {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    freezeTableName: true,
    underscored: true,
  },
};

export const puntoVenta = new ModelMySQL(dbActivame, PuntoVenta);
