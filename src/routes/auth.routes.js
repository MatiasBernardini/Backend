import {Router} from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const authRouter = Router ()

authRouter.post("/signup",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email:email});

        if(!user){
            //si no existe el usuario lo registramos
            const newUser ={
                email,
                password:createHash(password)
            }

            const userCreated = await userModel.create(newUser);

            req.session.user=userCreated.email; 

            req.session.rol = "user";

            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                req.session.rol = "admin";
            }

            return res.redirect("/profile");
        }

        console.log(req.session)

        res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
    } catch (error) {
        console.log(error);
    }
});

authRouter.post ("/login", async (req, res) =>{
    const {email, password} = req.body;
    const loginUser = await userModel.findOne({email:email })

    if (loginUser) {
        if (
            loginUser.email === "adminCoder@coder.com" &&
            loginUser.password === "adminCod3r123"
        ) {
          req.session.user = loginUser.email;
          req.session.rol = "admin";
          console.log(req.session);

          return res.redirect("/profile");
          
        } if(isValidPassword(loginUser, password)) {
          req.session.user = loginUser.email;
          req.session.rol = "user";

          return res.redirect("/profile");
        } else{
            res.send(`Error en inicio de sesion, vuelva a intentar `);
        }
    
    }
    res.send(`Usuario no registrado, <a href="/signup">registrarse</a>`);

})

authRouter.post("/logout", (req,res) =>{
    req.session.destroy(error => {
        if (error) {
            return res.send ("error en cerrar sesion");
        } else {
            return res.redirect("/login");
        }
    });
});

export default authRouter