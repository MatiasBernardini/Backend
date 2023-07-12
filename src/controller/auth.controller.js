import passport from "passport";
import { sendRecoveryPass } from "../utils/email.js";
import { generateEmailToken, verifyEmailToken, isValidPassword, createHash } from "../utils.js";
import { findUSerService, findUSerAndUpdateService, updateUserByIdService } from "../repository/user.repository.js";


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
            const user = await findUSerService(email);
            if(!user){
                return res.send(`<div>Error, <a href="/forgot-password">Intente de nuevo</a></div>`);
            }


            const token = generateEmailToken(email,2*60);
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


            const validEmail = verifyEmailToken(token);
            if(!validEmail){
                return res.send(`El enlace ya no es valido, genere un nuevo enlace para recuperar la contraseña <a href="/forgot-password" >Recuperar contraseña</a>`)
            }

            const user = await findUSerService(email);
            if(!user){
                return res.send("usuario no registrado")
            }
            if(isValidPassword(user, newPassword)){
                return res.send("No puedes usar la misma contraseña");
            }

            const userData = {
                ...user._doc,
                password:createHash(newPassword)
            }
            console.log("userData",userData)

            const userUpdate = await findUSerAndUpdateService(email, userData);
            res.render("login",{message:"Se ha actualiza correctamente la contraseña"});
        } catch (error) {
            console.log ("error", error)
            res.send(error.message);
        }
    }

    /*--------------------------------------------------------------*/


    static post_Logout = (req,res) =>{
        const user = {...req.user};

        user._doc.last_connection = new Date();

        req.session.destroy(async (err)=>{
            if(err) return res.json({status:"error", message:"no se pudo cerrar la sesión"});
            const userUpdated =  await updateUserByIdService(user._doc._id, user);
            res.redirect("/login");
        });
    }
}

export {authController}