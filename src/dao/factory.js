import { options } from "../config/config.js";

const persistence = options.server.persistence;

let productManager, CartManager;

switch (persistence) {
    case "mongo":
        const {connectDb} = await import("../config/dbConnection.js");
        connectDb();

        const {dbProductManager} = await import("./db-managers/ProductManager.js");
        productManager = new dbProductManager ();

        const {dbCartManager} = await import("./db-managers/cart.js");
        CartManager = new dbCartManager ();

        break;
    case "memory":
        const {ProductManager} = await import("./file-managers/ProductManager.js");
        productManager = new ProductManager ();

        const {cartManager} = await import("./file-managers/cart.js");
        CartManager = new cartManager ();
        break;
};

export {productManager, CartManager};