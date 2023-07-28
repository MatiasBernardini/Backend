import { Router, json } from "express";
import { checkRole } from "../middlewares/checkRole.js";
import { checkAuthenticated } from "../middlewares/checkAuthenticated.js";
import { userController } from "../controller/users.controller.js";
import { uploaderDocument } from "../utils.js";

const usersRouter = Router();
usersRouter.use(json())

usersRouter.put("/premium/:uid", checkRole(["admin"]) , userController.put_Premium_User );

usersRouter.put("/:uid/documents", checkAuthenticated , uploaderDocument.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]) , userController.put_Upload_Documents_User );

usersRouter.get("/", userController.get_All_Users);

usersRouter.delete("/inactive-user-removed", userController.delete_UserRemovedDueToInactivity);

export { usersRouter};