import passport from "passport";
import { sendRecoveryPass } from "../utils/email.js";
import { generateEmailToken, verifyEmailToken, isValidPassword, createHash } from "../utils.js";
import UserModel from "../dao/models/user.model.js"

class authController{
    static post_PassportSignup = passport.authenticate("signupStrategy",{
        failureRedirect:"/api/sessions/failure-signup"
    })

    static redirect_Profile = (req,res)=>{
        return res.redirect("/profile");
    }

    static get_FailedSignup = (req,res)=>{
        res.send("No fue posible registrar el usuario");
    }

    /*--------------------------------------------------------------*/

    static get_PassportAuthenticateGithub = passport.authenticate ("githubSignup")

    static get_GithubCallback = passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/failure-signup"
    })

    static res_UserAuthenticate = (req,res)=>{
        res.send("usuario autenticado")
    }

    /*--------------------------------------------------------------*/

    static post_PassportLogin = passport.authenticate("loginStrategy",{
        failureRedirect:"/api/sessions/failure-login"
    })

    static redirect_ProfileLogin = async (req,res)=>{
        req.session.userId = req.user._id;
    
        return res.redirect("/profile");
    }

    static get_FailedLogin = (req,res)=>{
        res.send("No fue posible iniciar sesion");
    }

    /*--------------------------------------------------------------*/

    static post_ForgotPassword = async (req, res) => {
        try {
            const {email} = req.body;
            //verificamos que el usuario exista
            const user = await UserModel.findOne({email:email});
            if(!user){
                return res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`);
            }

            //si el usuario existe, generamos el token del enlace
            const token = generateEmailToken(email,3*60);
            await sendRecoveryPass(email,token);
            res.send("se envio un correo a su cuenta para restablecer la contraseña, regresar <a href='/login'>al login</a>");

        } catch (error) {
            res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`)
        }
    }

    static post_ResetPassword = async (req, res) => {
        try {
            const token = req.query.token;
            const {email, newPassword} = req.body;

            //validamos el token
            const validEmail = verifyEmailToken(token);
            if(!validEmail){
                return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password" >Recuperar contraseña</a>`)
            }

            const user = await UserModel.findOne({email:email});
            if(!user){
                return res.send("El usuario noe sta registrado")
            }
            if(isValidPassword(user, newPassword)){
                return res.send("No puedes usar la misma contraseña");
            }

            const userData = {
                ...user._doc,
                password:createHash(newPassword)
            }
            console.log("userData",userData)

            const userUpdate = await UserModel.findOneAndUpdate({email:email},userData);
            res.render("login",{message:"contraseña actualizada"});
        } catch (error) {
            console.log ("error", error)
            res.send(error.message);
        }
    }

    /*--------------------------------------------------------------*/


    static post_Logout = (req,res) =>{
        req.logOut((error) => {
            if (error) {
              return res.send("no se pudo cerrar la sesion");
            } else {
              req.session.destroy((err) => {
                if (error) {
                  return res.send("no se pudo cerrar la sesion");
                }
                res.redirect("/login");
              });
            }
      });
    }
}

export {authController}