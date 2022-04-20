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

export const credencialesEmpresa = new ModelMySQL(
  dbActivame,
  CredencialesEmpresa
  );
  export const cuponesUtilizados = new ModelMySQL(dbActivame, CuponesUtilizados);
  
  export const TicketUtilizadoEmpresa = {
    name: "ticketUtilizadoEmpresa",
    schema: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      giftcard: { type: DataTypes.STRING },
      condicionesPlana: { type: DataTypes.STRING ,field: 'condicionesPlana'},
    },
    options: {
      createdAt: false,
      updatedAt: false,
      deletedAt: false,
      freezeTableName: true,
      underscored: true,
    },
  };

  export const ticketUtilizadoEmpresa = new ModelMySQL(dbValecart, TicketUtilizadoEmpresa);