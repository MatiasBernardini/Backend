import nodemailer from "nodemailer";
import { options } from "../config/config.js";

const portServer = options.server.port;

const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:options.gmail.emailCreator,
        pass:options.gmail.emailPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export const sendRecoveryPass = async(userEmail,token)=>{
    const link = `http://localhost:${portServer}/reset-password?token=${token}`;


    await transporter.sendMail({
        from:options.gmail.emailCreator,
        to:userEmail,
        subject:"restablecer contraseña",
        html:`
            <div>
                <h2>Has solicitado un cambio de contraseña</h2>
                <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
                <a href="${link}">
                    <button> Restablecer contraseña </button>
                </a>
            </div>
        `
    })
};

export const sendRemovedProductEmail = async(userEmail)=>{
    await transporter.sendMail({
        from:options.gmail.emailCreator,
        to:userEmail,
        subject:"Su producto publicado fue eliminado",
        html:`
            <div>
                <h2>Producto eliminado</h2>
                <p>Su producto fue eliminado de nuestra pagina web ya que no cumple con los criterios solicitados o es inapropiado</p>
            </div>
        `
    })
};