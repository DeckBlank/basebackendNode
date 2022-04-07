import {MailService} from '@sendgrid/mail'
import { API_KEY_EMAIL, EMAIL_SIGNIN  } from '../../config/enviroments';

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