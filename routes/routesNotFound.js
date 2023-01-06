import { responseGenerator } from "../utils/responseGenerator.js";

export const routesNotFound = (req,res) => {
    res.status(404);
    res.json(responseGenerator({
        message:'route not found',
        status:404
    }));
}