import { createJWT, validateCrypto } from "../utils/index.js";

import { Roles } from "./Roles.js";
import { dbUser } from "../db/mongodb/models.js";

const createError = (message) => {
    return new Error(message);
}

export class User {
    static async sigIn({email,password}){
        let user = await dbUser.findOne({ find: { email } ,keys:['password','names','lastNames','roles']});
        if (!user) {
            const error = new Error;
            error.message =  "User not found";
            return error
        } 
        let passValidatePass = await validateCrypto({
            plainText: password,
            crypto: user.password,
        });
        if (!passValidatePass) {
            const error = new Error;
            error.message =  "Wrong Password";
            return error
        }  
        let token = await createJWT({ hash: user._id,roles:user.roles });
        const  {names,lastNames, roles} = user;
        return  {
            token,
            user: true,
            names,
            lastNames,
            roles ,
            }
    }
    static async sigUp({names,lastNames,email,password,terms}){
        if(!terms) return createError('Needs accept terms and conditions!');
        let user = await dbUser.findOne({ find: { email } ,keys:['_id']});
        if(user) return createError('User already registed!');
        const roles = [Roles.CUSTOMER_ROL];
        try {
            let tokenForEmail = await createJWT({ email,date: new Date() },'2h');
            user = await dbUser.createOne({
                data: {
                    names,
                    lastNames,
                    email,
                    password,
                    roles,
                    verifieldEmail:false,
                    tokenForEmail,
                    terms
                }
            })
            return await this.sigIn({email,password});   
        } catch (error) {
            return error;
        }

    }
}