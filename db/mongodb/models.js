import { Schema } from "mongoose";
import { db } from "..";
import { Model } from "./config";
const bcrypt = require('bcrypt');

export const DBUser = {
  collectionName: "caUser",
  schema: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    roles : [{
      type: Schema.Types.ObjectId,
      ref: 'caRoles',
      required: true
    }],
    emailConfirmed : {type:Boolean , default:false},
    tokenForEmail : String,
    facebookId: { type: String },
    direcciones: [
      {
        _id: false,
        direccion: String ,
        main: Boolean
      }
    ]
  },
  pre : [
    {
      name : 'save',
      function : async function(next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
      }
    }
  ]
}

export const dbUser = new Model(db,DBUser)
