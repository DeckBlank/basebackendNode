import { ObjectId } from "mongodb";
export class dbOperations {
  constructor(collection) {
    this.collection = collection;
  }
  raw = collection;
  findOne = async (find) =>
    await this.collection.findOne({
      where: find,
    });
  findOne2 = async ({ where, attributes }) =>
    await this.collection.findOne({
      where,
      attributes,
    });
  find2 = async ({ where, attributes }) =>
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
  find = async (find) =>
    await this.collection.findAll({
      where: find,
    });
  query = async (query, model) =>
    await this.collection.query(
      query,
      { type: QueryTypes.SELECT }
    );
}
