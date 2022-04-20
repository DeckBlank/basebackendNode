const { Op , QueryTypes } = require("sequelize");
export class dbOperations {
  constructor(collection) {
    this.collection = collection;
  }
  raw = this.collection;
  findOne = async ({ where, attributes }) =>
    await this.collection.findOne({
      where,
      attributes,
    });
  find = async ({ where, attributes }) =>
    await this.collection.findAll({
      where,
      attributes,
    });
  findWithOr = async (find) =>
    await this.collection.findAll({
      where: {
        [Op.or]: find,
      },
    });
  selectQuery = async (query, model) =>
    await this.collection.query(query, { type: QueryTypes.SELECT });
  create = async ({ data }) => await this.collection.create(data);
}
