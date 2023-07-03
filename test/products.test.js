import chai from "chai";
import supertest from "supertest";
import { options } from "../src/config/config.js";

const port = options.server.port;

const expect = chai.expect;

const requester = supertest (`http://localhost:${port}`);

describe ("testing de products" , () =>{

    describe ("test para el modulo de products", () =>{
        it ("el endpoint get /api/products debe dejar visualizar todos los productos correctamente", async ()=>{

            const result = await requester.get("/api/products").send()

            const {_body} = result

            expect (Array.isArray(_body.docs)).to.deep.equal(true)
        })

        it ("el endpoint post /api/products crea un producto correctamente", async ()=>{
            const productMock = {
                title : "producto prueba",
                description : "producto prueba",
                price: 40,
                code: 2,
                stock: 382
            }

            const result = await requester.post("/api/products").send(productMock)

            expect (result.statusCode).to.be.equal(200)
        })

        it ("si el endpoint post /api/products no tiene algun parametro solicitado, debe devolver un status error", async ()=>{
            const productMock = {
                title : "producto prueba",
                description : "producto prueba",
                price: 40,
                code: 2,
            }

            const result = await requester.post("/api/products").send(productMock)

            const {_body} = result

            expect (_body.status).to.be.equal("error")
        })
    })
})

