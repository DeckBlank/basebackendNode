import MD5 from 'crypto-js/md5.js'
import { SECRET } from '../config/enviroments.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const isValidPassword = async function(user,password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export const createJWT = async (body,expiresIn='2h',secret)=>{
    secret = SECRET||secret;
    return jwt.sign({ body }, secret,
    {
        expiresIn,
    });
}

export const checkAuthJWT = async (token) => {
    try {
        return await jwt.verify(token, SECRET);
    } catch (error) {
        return error
    }
}

export const getYmdHis = (date=new Date()) => {
    let formatDate = date.toLocaleDateString("en-PE", { year:'numeric',month: "2-digit", day: "2-digit", }).split('/');//.replace(/\D/g,'');
    formatDate = formatDate[2]+formatDate[1]+formatDate[0];
    let formatHour = date.toLocaleDateString("en-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" ,hour12: false}).split(' ')[1].replace(/\D/g,'');
    return formatDate + formatHour
}
export const getYmd_Hsi = (date=new Date()) => {
    const iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
    return `${iso[1]} ${iso[2]}`
}
export const getYmd = (date=new Date()) => {
    const iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
    return iso[1]
}

export const md5Encryption = (string) =>{
    return MD5(string).toString();
}
export const md5Decryption = (string) =>{
    return MD5(string).toString();
}

export const validateCrypto = ({crypto,plainText})  => {
    return new Promise ((resolve,reject) => {
        bcrypt.compare(plainText, crypto, function(err, result) {
            if(err) reject(false);
            resolve(result);
       });
    })
}

export const convertTZ = (date, tzString = 'America/Lima') => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
};

export const ObjectId = mongoose.Types.ObjectId