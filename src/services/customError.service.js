import { addLogger } from "../utils/logger.js";

const logger = addLogger();

export class CustomError{
    static createError({name="Error",cause,message,errorCode}){
        const error = new Error(message,{cause});
        error.name=name;
        error.code=errorCode;
        logger.error("error", error.cause);
        throw error;
    }
}; 