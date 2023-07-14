import {Router, json} from "express";
import { authController } from "../controller/auth.controller.js";
import { uploaderProfile } from "../utils.js";

const authRouter = Router ()
authRouter.use(json());

/*-----------------------------SIGNUP--------------------------------------------------*/

authRouter.post("/signup", uploaderProfile.single("avatar") ,authController.post_PassportSignup, authController.redirect_Profile);

authRouter.get("/failure-signup", authController.get_FailedSignup);

/*----------------------------SIGNUP-GITHUB----------------------------------------------------*/

authRouter.get ("/github", authController.get_PassportAuthenticateGithub)

authRouter.get("/github-callback", authController.get_GithubCallback , authController.res_UserAuthenticate)

/*---------------------------------LOGIN-----------------------------------------------*/

authRouter.post("/login", authController.post_PassportLogin, authController.redirect_ProfileLogin);

authRouter.get("/failure-login",authController.get_FailedLogin);

/*----------------------------------RESET PASSWORD----------------------------------------------*/

authRouter.post ("/forgot-password", authController.post_ForgotPassword);

authRouter.post ("/reset-password", authController.post_ResetPassword);

/*----------------------------------LOGOUT----------------------------------------------*/

authRouter.post("/logout", authController.post_Logout);

export default authRouter