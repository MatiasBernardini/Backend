import __dirname from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const port = 8080;

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion api proyecto backend",
            version:"1.0.0",
            description:"Definicion de endpoints para la api"
        },
        servers: [{url: `http://localhost:${port}`}]
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`],
};

export const swaggerSpecs =swaggerJsDoc(swaggerOptions);