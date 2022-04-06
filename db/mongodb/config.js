import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { logger } from '../../config/logger.js'
import { dbOperations } from './DAO.js';

export class Model extends dbOperations {
  constructor (connection,model){
    super();
    let {collectionName,schema,pre,pro} = model;
    let newSchema =  new Schema( schema, { timestamps: true })
    if(pre) {
      for (const _pre of pre) {
        newSchema.pre(_pre.name,_pre.function);
      }
    } 
    if(pro) {
      for (const _pro of pro) {
        newSchema.pro(_pro.name,_pro.function);
      }
    } 
    this.collection = connection.model(
      collectionName, newSchema, collectionName
    );
  } 
}