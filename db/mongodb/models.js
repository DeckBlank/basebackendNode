import { Schema } from "mongoose";
import { db } from "..";
import { Model } from "./config";
const bcrypt = require('bcrypt');

export const MgmtUser = {
  collectionName: "mgmtUser",
  schema: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    roles : [{
      type: Schema.Types.ObjectId,
      ref: 'mgmtRoles',
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

export const mgmtUser = new Model(db,MgmtUser)


export const MgmtRolls = {
  collectionName: "mgmtRoles",
  schema: {
    name: { type: String, unique: true  },
    allowRoutes: [
      {
        _id: false,
        path: String ,
        method : {type:String,enum:['post','get','put','patch']},
        gqType : {type:String,enum : ['query','mutation']}
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

export const mgmtRolls = new Model(db,MgmtRolls)