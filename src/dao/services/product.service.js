import { productsRepository } from "../repositories/index.js";
import ErrorCode from "./errors/enum.errors.js";
import CustomError from "./errors/errors.service.js";
import { addProductErrorInfo } from "./errors/info.js";

export default class ProductsService {
    constructor() {
        this.productsRepository = productsRepository
    }
    getAllproducts = async () => {
        try {
            return await this.productsRepository.getallProducts();
        } catch (error) {
            console.log(error)
        }
    }
    getProductsfilterPage = async (page, limit, category, usable, sort) => {
        try {
            return await this.productsRepository.getproductsPage(page, limit, category, usable, sort);
        } catch (error) {
            console.log(error)
        }
    }
    getProductsbyitsId = async (pid) => {
        try {
            return await this.productsRepository.getProductsbyId(pid)
        } catch (error) {
            console.log(error)
        }
    }
    createProduct = async (product) => {
        
        try {

            if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
                const error = CustomError.createError({
                  name: "Add product error",
                  cause: addProductErrorInfo({
                    title:product.title,
                    description:product.description,
                    code:product.code,
                    price:product.price,
                    stock:product.stock,
                    category:product.category,
                  }),
                
                  message: "Error trying to create new product"+" "+"because"+" "+addProductErrorInfo({
                    title:product.title,
                    description:product.description,
                    code:product.code,
                    price:product.price,
                    stock:product.stock,
                    category:product.category,
                  }),
                  code: ErrorCode.MISSING_DATA_ERROR,
        
                });
                return error.message;
              }
            const existingProduct = await this.productsRepository.getByCode(product.code);
            if (existingProduct) {
                return { error: `The product that you created is duplicated.` };
            }
            return await this.productsRepository.createProduct(product)
        } catch (error) {
            console.log(error)
        }

    }
    updateProduct = async (product, pid) => {
        try {
            const existingProduct = await this.productsRepository.getProductsbyId(pid);
            if (!existingProduct) {
                return { error: `The product with this ID does not exists.` };
            }
            return await this.productsRepository.updateProduct(product,pid)
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct=async(pid)=>{
        try {
            const existingProduct = await this.productsRepository.getProductsbyId({_id:pid});
            if (!existingProduct) {
                return { error: `The product with this ID does not exists.` };
            }
            return this.productsRepository.deleteProduct({_id:pid})
        } catch (error) {
            console.log(error)
        }
    }
}
