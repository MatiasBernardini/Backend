import userModel from "../models/user.model.js";

export class userManager {
    constructor (){};

    async getUsers() {
        const users = await userModel.find().lean()
        return users
    }

    async findUSer(email) {
        let user = userModel.findOne({ email: email });

        return user
    }

    async findUserById (id){
        let user = userModel.findById (id)

        return user
    }

    async findOneUSerAndUpdate(email, userData) {
        let user = userModel.findOneAndUpdate({ email: email }, userData);

        return user
    }


    async findUSerAndUpdateById(_id, userData) {
        let user = userModel.updateOne({_id:_id}, userData);

        return user
    }

    async updateUserById(_id, userData) {
        let user = userModel.findByIdAndUpdate(_id, userData);

        return user
    }

    async userDelete(uid) {
        const user = await userModel.findByIdAndDelete(uid)
        return user
    }

}