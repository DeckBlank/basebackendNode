import { logger } from "../config/logger.js"
import { responseGenerator } from "../utils/responseGenerator.js"

export const mainHandleErrors = (error, req, res, next) => {
    logger.info("Error Handling Middleware called")
    logger.info('Path: ', req.path)
    logger.error('Error: ', error)

    switch (error.type) {
        case 'no-data':
            res.status(408).json(responseGenerator({status:408,message:'the request not generated data'}));    
            break;
        case 'token-omited':
            res.status(400).json(responseGenerator({status:400,message:'Bearer not included'}));    
            break;
        case 'token-expired':
            res.status(401).json(responseGenerator({status:401,message:'token expired'}));    
            break;
        case 'invalid-token':
            res.status(401).json(responseGenerator({status:401,message:'invalid token'}));    
            break;
        default:
            res.status(500).json(responseGenerator({status:500,message:'server error'}));
            break;
    }
}