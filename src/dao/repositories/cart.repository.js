import { cartModel } from "../models/cart.model.js";
export default class CartRepository {
    constructor() {
        this.cartModel = cartModel
    }

    createCart = async (cart) => {
        try {
          const productCreated = await this.cartModel.create(cart);
          return productCreated;
        } catch (error) {
          console.log(error);
        }
      };
    getCarts = async () => {
        try {
            return this.cartModel.find();

        } catch (error) {
            console.log(error);
        }
    }
    saveCart = async (cart) => {
        try {
            return await this.model.findOneAndUpdate({_id: cart._id}, { $set: cart });
        } catch (error) {
            throw new Error(error);
        }
    }
    getCartsbyId = async (cid) => {
        try {
            return this.cartModel.findOne({ _id: cid }).lean();
        } catch (error) {
            console.log(error);
        }
    };
    addProducttotheCart = async (cid, cart) => {
        try {
            return this.cartModel.updateOne(cid, cart)
        } catch (error) {
            console.log(error)
        }
    }
    updatetheCart = async (cid, cart) => {
        try {
            return this.cartModel.updateOne({_id:cid}, cart);
        } catch (error) {
            console.log(error);
        }
    }
    updateProductFromtheCart = (cid, pid, cart) => {
        try {
            return this.cartModel.updateOne(cid, pid, cart);
        } catch (error) {
            console.log(error);
        }

    }
    deleteCartAll = (cid, cart) => {
        try {
            return this.cartModel.deleteOne(cid,cart);
        } catch (error) {
            console.log(error)
        }

    }

    deleteproductfromtheCart= (cid,cart)=>{
        try {
            return this.cartModel.updateOne(cid,cart)            
        } catch (error) {
            console.log(error)
        }
    }
}
