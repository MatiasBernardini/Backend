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

// import ProductManager from "./file-managers/ProductManager.js"
// import cartManager from "./file-managers/cart.js"
// import dbProductManager from "./db-managers/ProductManager.js"
// import dbCartManager from "./db-managers/cart.js"

// const config = {
//     persistenceType: "db",
//   };
  
//   let productManager, CartManager;
  
//   if (config.persistenceType === "db") {
//     productManager = dbProductManager;

//     CartManager = dbCartManager;

//   } else if (config.persistenceType === "file") {
//     productManager = ProductManager; 

//     CartManager = cartManager;
//   } else {
//     throw new Error("Unknown persistence type");
//     }
  
//   export { productManager, CartManager };