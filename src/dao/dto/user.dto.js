export class CreateUserDto{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.password = user.password;
        this.full_Name = `${user.first_name} ${user.last_name}`;
        this.rol = user.rol
        this.cart = user.cart
    }
};

export class GetUserDto{
    constructor(userDB){
        this.full_Name = userDB.full_Name;
        this.age = userDB.age;
        this.email = userDB.email;
        this.rol = userDB.rol;
        this.cart = userDB.cart
    }
};