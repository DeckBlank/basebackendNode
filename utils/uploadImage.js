import multer from 'multer';
import fs from 'fs';
import {extension} from 'mime-types';

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let { destination  } = req.uploadConditions;        
        if (!fs.existsSync(destination)){
            fs.mkdirSync(destination);
        }
        cb(null, destination);
    },
    filename: async (req, file, cb) => {
        const { fileName } = req.uploadConditions;
        //return cb(null,  file.originalname );
        if(fileName){
            const finalFileName = `${fileName()}.${extension(file.mimetype)}`;
            if(!req.multerFileNames) req.multerFileNames = [];
            req.multerFileNames.push(finalFileName)
            return cb(null,finalFileName);
        }
        return cb(null,  file.originalname );
    }
})
export const uploadImageMiddleware = multer({
    storage,
    fileFilter : async (req, file, cb) => {
        const { previousFunction,mimeTypeAllow} = req.uploadConditions;
        if(mimeTypeAllow&&!mimeTypeAllow.includes(file.mimetype)) return cb(new Error('format not alllow'))
        if(previousFunction){
            cb(null, await previousFunction(file));
        } else{
            cb(null, file);
        }
    }
}); 
