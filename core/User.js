import { dbUser } from "../db/mongodb/models";
import { createJWT, validateCrypto } from "../utils";

export class User {
    static async sigIn({email,password}){
        let user = await dbUser.findOne({ find: { email } ,keys:['password','names','fatherName','motherName','roles']});
        if (!user) return { status: "error", message: "User not found" };
        let passValidatePass = await validateCrypto({
            plainText: password,
            crypto: user.password,
        });
        if (!passValidatePass) return { status: "error", message: "Wrong Password" };
        let token = await createJWT({ hash: user._id,roles:user.roles });
        const  {names,fatherName,motherName, roles} = user;
        return {
            data: {
            token,
            user: true,
            names,
            fatherName,
            motherName,
            roles,
            },
        };
    }
    static async sigUp({email,password}){

    }
}