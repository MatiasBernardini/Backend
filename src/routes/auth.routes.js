import {Router} from "express";
import userModel from "../dao/models/user.model.js";

const authRouter = Router ()

authRouter.post("/signup",async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email:email});

        if(!user){
            //si no existe el usuario lo registramos
            const newUser = await userModel.create({email, password});

            req.session.user=newUser.email;

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
    const loginUser = await userModel.findOne({email:email, password: password})

    if (!loginUser) {
        res.send(`Usuario no existente, debera registrarse <a href="/signup">Toque aquí</a>`);

    } else {
        if (
            loginUser.email === "adminCoder@coder.com" &&
            loginUser.password === "adminCod3r123"
        ) {
          req.session.user = loginUser.email;
          req.session.rol = "admin";
          console.log(req.session);

          return res.redirect("/profile");
          
        } else {
          req.session.user = loginUser.email;
          req.session.rol = "user";

          return res.redirect("/profile");
        }
    
    }

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