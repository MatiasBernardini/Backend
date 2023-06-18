import { userManager } from "../dao/db-managers/user.manager.js";

let managerUser = new userManager();


export async function findUSerService(email) {
    let user = await managerUser.findUSer(email);

    return user;
}

export async function findUserByIdService(id) {
    let user = await managerUser.findUserById(id);

    return user;
}

export async function findUSerAndUpdateService(email, userData) {
    let user = await managerUser.findOneUSerAndUpdate(email, userData);

    return user;
}

export async function findUSerUpdateByIdService(id, userData) {
    let user = await managerUser.findUSerAndUpdateById(id, userData);

    return user;
}