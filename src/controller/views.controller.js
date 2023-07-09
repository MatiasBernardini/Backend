import { productService } from "../repository/index.js"
import { CartManager} from "../dao/factory.js" /*revisar la funcion getCartProducts, ya que no funciona bien con service*/
import { GetUserDto } from "../dao/dto/user.dto.js";

class viewsController {
    static get_Home = async (req, res) => {
        res.render ("home")
    }

    static get_Login = async (req, res) => {
        res.render ("login")
    }

    static get_Signup = async (req, res) => {
        res.render ("signup")
    }

    static get_Forgot = async (req, res) => {
        res.render ("forgotPassword")
    }

    static get_ResetPass = async (req, res) => {
        const token = req.query.token;

        res.render ("resetPassword", {token})
    }

    static get_Profile = async (req, res) => {
        if (!req.user){
            res.send (`Tiene que iniciar sesion, para ver su perfil <a href="/login">Incia sesion</a>`)
        } else {
            let userDto = new GetUserDto (req.user);
            const {full_Name, age, email, rol, cart} = userDto
    
            const userInfo = {
                userFullName : full_Name,
                userAge : age,
                userEmail : email,
                userRol : rol,
                userCart : cart
            }
    
            res.render ("profile", {userInfo})

            req.logger.info (userDto)
        }
    }

    static get_Cart_Id = async (req, res) => {
        const {cid} = req.params

        const cart = await CartManager.getCartProducts(cid)
    
        const cartProducts = cart.products
    
        res.render("cart", {cartProducts})
    }

    static get_Products = async (req, res) => {
        try {
            if (!req.user){
                res.send (`Tiene que iniciar sesion, para ver todos los productos <a href="/login">Incia sesion</a>`)
            } else{
                const fullName = req.user.full_Name;
                const {limit = 10,page=1,category,stock,sort="asc"} = req.query;
                const stockValue = stock==0 ? undefined : parseInt(stock);
                if(!["asc","desc"].includes(sort)){
                    return res.json({status:"error", mesage:"orden no valido"});
                };
                const sortValue= sort === "asc" ? 1 : -1;
    
                let query={};
                if (category && stockValue) {
                    query = { category: category, stock: {$gte:stockValue} };
                } else {
                    if (category || stockValue) {
                        if (category) {
                          query = { category: category };
                        } else {
                          query = { stock: {$gte:stockValue} };
                        }
                    }
                };
    
                const result = await productService.getPaginateProductsRepository(
                    query,
                    {
                        page,
                        limit,
                        sort:{price:sortValue},
                        lean:true,
                    }
                );
    
                const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
                const data ={
                    fullNameUser:fullName,
                    status:"success",
                    payload: result.docs,
                    totalDocs: result.totalDocs,
                    totalPages: result.totalPages,
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    page: result.page,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
                    nextLink: result.hasNextPage ? baseUrl.includes("page") ?
                    baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) :baseUrl.concat(`?page=${result.nextPage}`) : null
                };
                res.render("real_time_products", data);
            }
        } catch (error) {
            res.send(`<div>Hubo un error al cargar esta vista</div>`);
        }  
    }

    static get_specificProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await productService.getProductById(productId);
            res.render("productDetail",product);
        } catch (error) {
            res.send(`<div>Hubo un error al cargar esta vista</div>`);
        }
    }
}

export {viewsController}