import passport from "passport";

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