import { Schema } from "mongoose";
import { db } from "..";
import { Roles } from "../../core/Roles";
import { Model } from "./config";
const bcrypt = require('bcrypt');

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
  ]
}

export const dbUser = new Model(db,DBUser)
