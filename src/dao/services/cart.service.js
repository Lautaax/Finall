import { cartRepository } from "../repositories/index.js";
import ErrorCode from "./errors/enum.errors.js";
import CustomError from "./errors/errors.service.js";
import { CartErrorInfo } from "./errors/info.js";
export default class CartService {
    constructor() {
        this.cartRepository = cartRepository;
    }
    createCart=async()=>{
        try {
            return this.cartRepository.createCart()
        } catch (error) {
            console.log(error)
        }
    }

    getCarts = async () => {
        try {
            return this.cartRepository.getCarts();
        } catch (error) {
            console.log(error)
        }

    }
    getCartsbyId = async (cid) => {
        try {
            return this.cartRepository.getCartsbyId(cid);
        } catch (error) {
            console.log(error)
        }
    }
    addProductCart = async (cid, pid, quantity) => {
        try {

            if (!cid || !pid ){
      
                const error = CustomError.createError({
                    name: "Add product error",
                    cause: CartErrorInfo({
                        cid:cid,
                        pid:pid,
                    },quantity),
                  
                    message: "Error trying to add a new product to the cart"+" "+"because"+" "+CartErrorInfo({
                      cid:cid,
                      pid:pid,
                    },quantity),
                    code: ErrorCode.MISSING_DATA_ERROR,
          
                  });

                  return error.message;
            }
            let cartFound = await this.getCartsbyId({ _id: cid });

            const productIdInCart = cartFound.products.findIndex((product) => {
                return product.productId._id.toString() === pid;
            });

            if (productIdInCart !== -1) {
                if (isNaN(quantity) || quantity <= 0) {
                    await this.cartRepository.addProducttotheCart(
                        { _id: cid, "products.productId": pid },
                        { $inc: { "products.$.quantity": 1 } }
                    );
                    const updatedCartWithProduct = await this.getCartsbyId({ _id: cid });
                    return updatedCartWithProduct;
                } else {
                    await this.cartRepository.addProducttotheCart(
                        { _id: cid, "products.productId": pid },
                        { $inc: { "products.$.quantity": Number.parseInt(quantity) } }
                    );
                    const updatedCartWithProduct = await this.cartRepository.getCartsbyId({ _id: cid });
                    return updatedCartWithProduct;
                }

            } else {
                const productAddToCart = {
                    productId: pid,
                    quantity: quantity ? quantity : 1,
                };
                await this.cartRepository.addProducttotheCart(
                    { _id: cid },
                    { $push: { products: productAddToCart } }
                );
                const updatedCartWithProduct = await this.getCartsbyId({ _id: cid });
                return updatedCartWithProduct;
            }
        } catch (error) {
            console.log(error)
        }
    }
    updateCart = async (cid, cart) => {
        try {
            const cartUpdated = await this.cartRepository.updatetheCart({ _id: cid }, { products: cart })
            return cartUpdated
        } catch (error) {
            console.log(error)
        }
    }
    updateProductFromCart = async (cid, pid, quantity) => {
        try {
            let updatedCartProduct;
            if (isNaN(quantity) || quantity < 0) {
                updatedCartProduct = await this.cartRepository.updateProductFromtheCart(
                    { _id: cid, "products.productId": pid },
                    { "products.$.quantity": 1 }
                );
            } else {
                updatedCartProduct = await this.cartRepository.updateProductFromtheCart(
                    { _id: cid, "products.productId": pid },
                    { "products.$.quantity": quantity })
            }

            return updatedCartProduct;
        } catch (error) {
            console.log(error);
        }
    };
    deleteCart = async (cid) => {
        try {
            const cart = await this.cartRepository.getCartsbyId({ _id: cid })
          
            const cartDeleted = await this.cartRepository.deleteCartAll({ _id: cid }, { products: [] });
            return cartDeleted
        } catch (error) {
            console.log(error)
        }
    }
    deleteproductfromCart = async (cid, pid) => {
        try {

            const productEliminated = await this.cartRepository.deleteproductfromtheCart(
                { _id: cid },
                { $pull: { products: { productId: pid } } }
            );

            return productEliminated;
        } catch (error) {
            console.log(error)
        }
    }
}
