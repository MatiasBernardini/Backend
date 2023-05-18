export const checkRole = (rol) => {
    return (req, res, next) => {
        if (!req.user){
            return res.json ({status: "error", message: "necesitas iniciar sesion"});
        }
        if (!rol.includes (req.user.rol)){
            return res.json ({status: "error", message: "no estas autorizado"});
        }
        next ()
    }
}