import chai from "chai";
import supertest from "supertest";
import { options } from "../src/config/config.js";

const port = options.server.port;

const expect = chai.expect;

const requester = supertest (`http://localhost:${port}`);

describe ("testing de cart" , () =>{

    describe ("test para el modulo de cart", () =>{
        it ("el endpoint post /api/carts crea un nuevo carrito para utilizar, con un id unico y el array de productos vacio", async ()=>{

            const result = await requester.post("/api/carts").send()

            const {_body} = result

            expect (_body.products).to.deep.equal([])
        })

        it ("el endpoint get /api/carts/:cid muestra el carrito selecionado por id", async ()=>{

            const result = await requester.get("/api/carts/649c8f5c4ec2d20809ad0462").send()

            const {_body} = result

            expect (_body.payload).to.be.ok;
            expect (_body.status).to.deep.equal('succes')
        })

        it ("el endpoint delete /:cid/products/:pid debe eliminar el producto selecionado del carrito", async ()=>{

            const result = await requester.delete("/api/carts/649c8f5c4ec2d20809ad0462/products/648fa5385d46b64836cc046a").send()

            const {_body} = result

            expect (_body.payload).to.deep.equal('producto eliminado correctamente');
            expect (_body.status).to.deep.equal('succes')
        })
    })

    
})