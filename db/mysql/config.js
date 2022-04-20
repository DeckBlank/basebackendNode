import { dbOperations } from './DAO.js';

export class ModelMySQL extends dbOperations {
  constructor(connection,model) {
    super();
    this.collection = connection.define(
      model.name, model.schema,model.options
    );
  }
}