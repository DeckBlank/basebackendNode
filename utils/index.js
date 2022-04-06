import {MailService} from '@sendgrid/mail'
import bcrypt from 'bcrypt'
import { API_KEY_EMAIL, EMAIL_SIGNIN, SECRET } from '../config/enviroments';
const jwt = require('jsonwebtoken');

export const isValidPassword = async function(user,password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export const createJWT = async (user)=>{
    const body = { _id: user._id, email: user.email };
    return jwt.sign({ user: body }, SECRET,
    {
        expiresIn: "2h",
    });
}

export const checkAuthJWT = async (token) => {
    try {
        return await jwt.verify(token, SECRET);
    } catch (error) {
        return null
    }
}



const sgMail = new MailService();
sgMail.setApiKey(API_KEY_EMAIL);
export const sendMail = ({email, key ,subject,text,html,from}) =>{
    if(key) sgMail.setApiKey(key)
    else sgMail.setApiKey(API_KEY_EMAIL);
    const msg  = {
        to : email,
        from : from?from:EMAIL_SIGNIN,
        subject ,
        text, 
        html
    }
    try {
        return sgMail.send(msg)
    } catch (error) {
        return null;
    }
}