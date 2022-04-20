import bcrypt from 'bcrypt'
import {  SECRET } from '../config/enviroments';
import MD5 from 'crypto-js/md5'
const jwt = require('jsonwebtoken');

export const isValidPassword = async function(user,password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export const createJWT = async (body,expiresIn='2h')=>{
    return jwt.sign({ body }, SECRET,
    {
        expiresIn,
    });
}

export const checkAuthJWT = async (token) => {
    try {
        return await jwt.verify(token, SECRET);
    } catch (error) {
        return null
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