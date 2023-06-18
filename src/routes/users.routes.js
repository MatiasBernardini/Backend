import { Router, json } from "express";
import userModel from "../dao/models/user.model.js";
import { checkRole } from "../middlewares/checkRole.js";
import { userController } from "../controller/users.controller.js";

const usersRouter = Router();
usersRouter.use(json())

usersRouter.put("/premium/:uid", checkRole(["admin"]) , userController.put_Premium_User );

export { usersRouter};