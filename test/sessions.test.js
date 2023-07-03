import chai from "chai";
import supertest from "supertest";
import { options } from "../src/config/config.js";

const port = options.server.port;

const expect = chai.expect;

const requester = supertest (`http://localhost:${port}`);

let cookie;

describe ("testing de sessions" , () =>{

    describe ("test para el modulo de sessions", () =>{

        it ("el endpoint post /api/sessions/signup crea un nuevo usuario correctamente y lo redirige al profile", async ()=>{
            const userMock = {
                first_name: "ale",
                last_name: "garnacho",
                age: "19",
                email: "garnacho@gmail.com",
                password: "1234"
            }

            const result = await requester.post("/api/sessions/signup").send(userMock)

            expect (result.redirect).to.be.equal(true)
        })

        it ("el endpoint post /api/sessions/signup al faltarle algun parametro first_name, last_name o age no crea al usuario y tira error", async ()=>{
            const userMock = {
                age: "19",
                email: "garnacho@gmail.com",
                password: "1234"
            }

            const result = await requester.post("/api/sessions/signup").send(userMock)

            const {_body} = result

            expect (_body.message).to.be.equal('Error creando el usuario')
        })


        it ("el endpoint post /api/sessions/login debe loguear al usuario", async ()=>{
            const userLoginMock = {
                email: "garnacho@gmail.com",
                password: "1234"
            }

            const result = await requester.post("/api/sessions/login").send(userLoginMock)

            const cookieResponse = result.header["set-cookie"][0]

            cookie = {
                name: cookieResponse.split ("=")[0],
                value: cookieResponse.split ("=")[1]
            }

            expect (cookie.name).to.be.equal('connect.sid')
        })

    })
})
