import  {ObjectId}  from 'mongodb';

export class dbOperations  {
    constructor(collection){
      this.collection = collection;
    }
    raw = this.collection;
     count = async ({query}) => await this.collection.countDocuments(query);
     findOne = async ({find,keys,options}) => await this.collection.findOne(find,keys,options);
     find = async ({find,keys,options}) => await this.collection.find(find,keys,options);
     findOneById = async ({id}) => await this.collection.findOne({_id:ObjectId(id)});
     findAll = async () => await this.collection.find();
     createOne = async ({data}) => await this.collection.create(data);
     createMany = async ({data}) => await this.collection.insertMany(data);
     updateOneById = async ({data}) => await this.collection.updateOne({_id:data.id},{$set:data},{upsert:true});
     updateOne = async ({query, update}) => await this.collection.updateOne(query,{$set:update},{upsert:true});
     updateOne2 = async ({find, update,options}) => await this.collection.updateOne(find,update,options);
     updateOnePush = async ({query, push}) => await this.collection.updateOne(query,{$push:push});
     deleteOneById = async ({id}) => await this.collection.deleteOne({_id:ObjectId(id)});
     deleteOne = async ({data}) => await this.collection.deleteOne(data);
     deleteMany = async ({objectsToDelete,count}) => {
        if(!count||!Number.isInteger(count)) return false;
        let objects = await this.collection.find(objectsToDelete)
        if(objects.length!==count) return false;
        return await this.collection.deleteMany(objectsToDelete)
      };
     aggregate = async ({pipe}) => await this.collection.aggregate(pipe);
     findOneAndUpdate = async ({find, update,options}) => await this.collection.findOneAndUpdate(find,update,options);
  }



