import { Model } from "./config.js";
import { Roles } from "../../core/Roles.js";
import bcrypt from "bcrypt";
import { db } from "../index.js";

export const DBUser = {
  collectionName: "caUsers",
  schema: {
    names: { type: String },
    lastNames: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    roles : [{
      type: String,
      enum: Roles.LIST_ROLES,
      required: true
    }],
    verifieldEmail : {type:Boolean , default:false},
    tokenForEmail : String,
    tokenRecoverCredentials : String,
    ADterms : Boolean,
    terms :Boolean
  },
  pre : [
    {
      name: "save",
      function: async function (next) {
        this.password = this.password?(await bcrypt.hash(this.password, 10)):this.password;
        next();
      },
    },
    {
      name: "updateOne",
      function: async function (next) {
        const modifiedField = this.getUpdate().$set.password;
        if (!modifiedField) {
            return next();
        }
        try {
            this.getUpdate().$set.password = await bcrypt.hash(modifiedField, 10);
            next();
        } catch (error) {
            return next(error);
        }
      },
    },
  ]
}

export const dbUser = new Model(db,DBUser)
