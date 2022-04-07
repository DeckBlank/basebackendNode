import bcrypt from 'bcrypt'
import {  SECRET } from '../config/enviroments';
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

