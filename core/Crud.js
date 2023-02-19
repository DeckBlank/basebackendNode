import { ObjectId } from "../utils/index.js";

export class Crud {

    constructor(){

    }
    static async updateObject2({params,keyId,dbObject,query,findToVerifyDB,findToVerify}){
        if(!params[keyId]){
            const error = new Error;
            error.message = `${keyId} is not included`;
            return error;
        }
        try {
            let temporal = await findToVerifyDB.findOne({
                find:findToVerify,keys:['_id']
            })
            if(!temporal) {
                const error = new Error;
                error.message = 'this object not have data to modify';
                return error;
            }
            await dbObject.updateOne({
                query ,
                update : {$set:params},
                options:{upsert:true}
            })
            return true;
        } catch (error) {
            return error
        }
      }

    static async createObject({params,keyId,keysParams,dbObject}){
        const validate = keysParams.reduce((p,c)=>{
            return {
                valid : p.valid && params[c] !== undefined,
                message : p.message + (!params[c] !== undefined ? `${c} is not included ` : '')
            }
        },{valid:true,message:''})
        if(!validate.valid) return Error(validate.message);	
        try {
            const object = await dbObject.createOne({
                data:params
            })
            return {
                [keyId]:object._id,
            }
        } catch (error) {
            return error
        }
    }
    static async getObjectById({params,keysParams,keyId,dbObject,multiple=false}){
        if(!params[keyId]&&multiple===false)
            return Error(`${keyId} is not included`);
        const project = keysParams.reduce((p,c)=>{
            return {...p,[c]:1}
        },{})
            ;
        try {
            const pipe = [
                {$match:params[keyId]?{_id:ObjectId(params[keyId])}:{...params}},
                {$project:{...project,[keyId]:'$_id',_id:0}} //_id:0,createdAt:0,updatedAt:0,
            ];
            return await dbObject.aggregate({
                pipe
            })
        } catch (error) {
            return error
        }
    }
    static async updateObject({params,keyId,dbObject}){
        if(!params[keyId]){
            const error = new Error;
            error.message = `${keyId} is not included`;
            return error;
        }
        let temporal = await dbObject.findOne({
            find:{_id:params[keyId]},keys:['_id']
        })
        if(!temporal) {
            const error = new Error;
            error.message = 'this object not have data to modify';
            return error;
        }
        try {
            await dbObject.updateOne({
                query : { _id: params[keyId] },
                update : {$set:params}
            })
            return params;
        } catch (error) {
            return error
        }
      }
    
    static async deleteObject({params,keyId,dbObject}){
        if(!params[keyId])
            throw Error(`${keyId} is not included`);
        let temporal = await dbObject.findOne({
            find:{ ...params,_id: params[keyId]},keys:['_id']
        })
        if(!temporal)
            throw Error(`this object not have data to modify`);
        try {
            await dbObject.deleteOne({
                data : { ...params,_id: params[keyId]},
            })
            return true;
        } catch (error) {
            return error
        }
      }
}