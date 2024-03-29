import { MAILING_EMAIL_SIGNIN, MAILING_URL_VALIDATE_EMAIL, PROYECTO, SECRET, SECRET_RECOVERY_EMAIL } from "../config/enviroments.js";
import { checkAuthJWT, createJWT, validateCrypto } from "../utils/index.js";

import { Google } from "./Google.js";
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
        const  {names,lastNames, roles} = user;
        return  this.returnTokenSigIn({_id:user._id,names,lastNames,roles});
    }
    static returnTokenSigIn({_id,roles,names, lastNames}){
        return {
            token: createJWT({ hash: _id,roles }),
            names,
            lastNames,
        }
    }
    static async sigInGoogle({ token }) {
        const { email, name, picture } = await Google.sigIn({ token });
        let user = await dbUser.findOne({ find: { email } ,keys:['names','lastNames','roles']});
        if (!user) {
            const roles = [Roles.CUSTOMER_ROL];
            user = await dbUser.createOne({
                data: { email, name, picture, roles },
            });
        }
        const  {names,lastNames, roles} = user;
        return  this.returnTokenSigIn({_id:user._id,names,lastNames,roles});
    }
    static async sigUp({names,lastNames,email,password,terms}){
        if(!terms) throw Error('Needs accept terms and conditions!');
        let user = await dbUser.findOne({ find: { email } ,keys:['_id']});
        if(user) throw Error('User already registed!');
        const roles = [Roles.CUSTOMER_ROL];
        try {
            let tokenForEmail = createJWT({ email,date: new Date() },'2h');
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
        const token = createJWT({_id},'1h',SECRET_RECOVERY_EMAIL);
        const urlRecovery = `${MAILING_URL_VALIDATE_EMAIL}?t=${token}`
        sendMail({
            email,
            subject:'Recuperación de contraseña',
            text:'Recuperación de contraseña',
            html:recoveryTemplate({userName:`${names}, ${lastNames}`,urlRecovery,companyName:PROYECTO}),
            from:MAILING_EMAIL_SIGNIN
        })
        await dbUser.updateOne({
            query:{email},
            update:{$set:{tokenRecoverCredentials:token}}
        })
        return `Se envio un enlace a ${email} para la recuperación de la contraseña.`
    }
    static async newCredentials({token,password}){
        const { _id } = checkAuthJWT(token,SECRET_RECOVERY_EMAIL);
        if(!_id) throw Error('Token invalid');
        const user = await dbUser.findOne({ find: { _id } ,keys:['email','tokenRecoverCredentials']});
        if(!user) throw Error('user not found');
        if(user.tokenRecoverCredentials !== token) throw Error('Token invalid');
        const { email } = user;
        await dbUser.updateOne({
            query:{_id},
            update:{$set:{password,tokenRecoverCredentials:''}}
        })
        return await this.sigIn({email,password});
    }
}