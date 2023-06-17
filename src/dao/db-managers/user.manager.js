import userModel from "../models/user.model.js";

export class userManager {
    constructor (){};

    async findUSer(email) {
        let user = userModel.findOne({ email: email });

        return user
    }

    async findOneUSerAndUpdate(email, userData) {
        let user = userModel.findOneAndUpdate({ email: email }, userData);

        return user
    }


}