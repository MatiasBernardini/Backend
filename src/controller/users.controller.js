import { findUserByIdService, findUSerUpdateByIdService, updateUserByIdService, getUSerService } from "../repository/user.repository.js";

export class userController {
    static put_Premium_User = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await findUserByIdService(userId);
            const userRol = user.rol;
    
            if(user.documents.length<3 && user.status !== "completo"){
                return res.json({status:"error", message:"El usuario no ha subido todos los documentos"});
            }

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

    static put_Upload_Documents_User = async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await findUserByIdService(userId);
            if(user){
                console.log(req.files);
                const identificacion = req.files['identificacion']?.[0] || null;
                const domicilio = req.files['domicilio']?.[0] || null;
                const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
                const docs = [];
                if(identificacion){
                    docs.push({name:"identificacion",reference:identificacion.filename});
                }
                if(domicilio){
                    docs.push({name:"domicilio",reference:domicilio.filename});
                }
                if(estadoDeCuenta){
                    docs.push({name:"estadoDeCuenta",reference:estadoDeCuenta.filename});
                }
                if(docs.length === 3){
                    user.status = "completo";
                } else {
                    user.status = "incompleto";
                }
                user.documents = docs;
                const userUpdated = await updateUserByIdService(userId ,user);
                res.json({status:"success", message:"documentos actualizados"});
            }
        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al intentar subir documentos"})
        }
    } 

    static get_All_Users = async (req, res) => {
        try {
            const allUser = await getUSerService ()

            const users = allUser.map(user=>({name:user.full_Name, email:user.email, rol:user.rol}))

            res.json({status:"success", message: users})
        } catch (error) {
            console.log(error.message);
            res.json({status:"error", message:"hubo un error al obtener todos los usuarios"})
        }
    
    }
}