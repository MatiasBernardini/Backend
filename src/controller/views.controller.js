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

            console.log (userDto)
        }
    }

    static get_Products = async (req, res) => {
        const { page, limit, sort, stock } = req.query
        const query = {stock}
        const product = await productService.getProduct(page, limit, sort, query)
    
        const data = {
            products: product.docs.map ((p) => ({
                title: p.title,
                description: p.description,
                price: p.price,
                code: p.code,
                stock: p.stock,
            })),
            totalDocs: product.totalDocs,
            limit: product.limit,
            totalPages: product.totalPages,
            page: product.page,
            pageCounter: product.pageCounter,
            hasPrevPage: product.hasPrevPage,
            hasNextPage: product.hasNextPage,
            prevPage: product.prevPage,
            nextPage: product.nextPage,
        }
        
        res.render("products", data )
    }

    static get_Cart_Id = async (req, res) => {
        const {cid} = req.params

        const cart = await CartManager.getCartProducts(cid)
    
        const cartProducts = cart.products
    
        res.render("cart", {cartProducts})
    }

}

export {viewsController}