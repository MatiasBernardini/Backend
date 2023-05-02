import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../dao/models/user.model.js";
import GithubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";

const initializedPassport = ()=>{
    passport.use("signupStrategy",new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async(req, username, password, done)=>{
            try {
                const {first_name, last_name, age } = req.body;
                const user = await userModel.findOne({email: username});
                if(user){
                    return done(null,false)
                }

                let rol = "user";
                if (
                    username === "adminCoder@coder.com" &&
                    password === "adminCod3r123"
                  ) {
                    rol = "admin";
                } 

                const newUser ={
                    first_name,
                    last_name, 
                    email:username,
                    age,
                    password:createHash(password),
                    rol
                };
                console.log (newUser)
                const userCreated = await userModel.create(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    /*-------------------------------------*/

    passport.use ("githubSignup", new GithubStrategy (
        {
            clientID: "Iv1.1a426182a5b21bb3",
            clientSecret: "150e318bdc3cd07eebfaba34eac77dda226bef04",
            callbackURL: "http://localhost:8080/api/sessions/github-callback"
        },

        async(accessToken, refreshToken, profile, done)=>{
            try {
                const userExists = await userModel.findOne({email:profile.username});
                
                if(userExists){
                    return done(null,userExists)
                }

                const newUser = {
                    name:profile.displayName,
                    email:profile.username,
                    password:createHash(profile.id)
                };

                const userCreated = await userModel.create(newUser);

                return done(null,userCreated)

            } catch (error) {
                return done(error)
            }
        }
    ))

    /*-------------------------------------*/

    passport.use("loginStrategy",new LocalStrategy(
        {
            usernameField:"email",
        },
        async( username, password, done)=>{
            try {
                const user = await userModel.findOne({email:username});
                if(!user){
                    return done(null,false)
                }

                if (!isValidPassword (user, password)) return done (null, false);
                return done (null, user);

            } catch (error) {
                return done(error);
            }
        }
    ));

    /*-------------------------------------*/
    passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
      passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        return done(null, user);
      });

}

export {initializedPassport}