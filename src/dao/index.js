import ProductManager from "./file-managers/ProductManager.js"
import cartManager from "./file-managers/cart.js"
import dbProductManager from "./db-managers/ProductManager.js"
import dbCartManager from "./db-managers/cart.js"

const config = {
    persistenceType: "db",
  };
  
  let productManager, CartManager;
  
  if (config.persistenceType === "db") {
    productManager = dbProductManager;

    CartManager = dbCartManager;

  } else if (config.persistenceType === "file") {
    productManager = ProductManager; 

    CartManager = cartManager;
  } else {
    throw new Error("Unknown persistence type");
    }
  
  export { productManager, CartManager };