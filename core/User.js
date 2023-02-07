import { MAILING_EMAIL_SIGNIN, MAILING_URL_VALIDATE_EMAIL, PROYECTO } from "../config/enviroments.js";
import { createJWT, validateCrypto } from "../utils/index.js";

import { Roles } from "./Roles.js";
import { dbUser } from "../db/mongodb/models.js";
import { recoveryTemplate } from "../utils/services/recoveryPasswordTemplate.js";
import { sendMail } from "../utils/services/sendGrid.js";

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
            names,
            lastNames,
            roles ,
            }
    }
    static async sigUp({names,lastNames,email,password,terms}){
        if(!terms) throw Error('Needs accept terms and conditions!');
        let user = await dbUser.findOne({ find: { email } ,keys:['_id']});
        if(user) throw Error('User already registed!');
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
    static async recover({email}){
        let user = await dbUser.findOne({ find: { email } ,keys:['names','lastNames']});
        if(!user) throw Error('user not found');
        const { names, lastNames,_id} = user;
        const urlRecovery = `${MAILING_URL_VALIDATE_EMAIL}?t=${createJWT({_id},'1h')}`
        sendMail({
            email,
            subject:'Recuperación de contraseña',
            text:'Recuperación de contraseña',
            html:recoveryTemplate({userName:`${names}, ${lastNames}`,urlRecovery,companyName:PROYECTO}),
            from:MAILING_EMAIL_SIGNIN
        })
        return `Se envio un enlace a ${email} para la recuperación de la contraseña.`
    }
}