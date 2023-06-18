import userModel from "../dao/models/user.model.js";
import { findUserByIdService, findUSerUpdateByIdService } from "../repository/user.repository.js";

export class userController {
    static put_Premium_User = async (req, res) => {
        try {
            const userId = req.params.uid;
            //verificar si el usuario existe en la base de datos
            const user = await findUserByIdService(userId);
            const userRol = user.rol;
    
            if(userRol === "user"){
                user.rol = "premium"
            } else if(userRol === "premium"){
                user.rol = "user"
            } else {
                return res.json({status:"error", message:"no es posible cambiar el role del usuario"});
            }
            await findUSerUpdateByIdService(userId, user);
            res.send({status:"success", message:"rol modificado"});
        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al cambiar el rol del usuario"})
        }
    } 
}