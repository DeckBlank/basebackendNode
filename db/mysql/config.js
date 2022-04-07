import Sequelize  from 'sequelize'
import { Schema } from 'mongoose'
import { logger } from '../../config/logger.js'
import { dbOperations } from './DAO.js';

export class ModelMySQL extends dbOperations {
  constructor(connection,model) {
    super();
    this.collection = connection.define(
      model.name, model.schema,model.options
    );
  }
}