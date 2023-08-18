import { productModel } from "../models/product.model.js";

export default class ProductsRepository {
    constructor() {
        this.productModel = productModel;
    }
    getallProducts = async () => {
        try {
            return this.productModel.find();
        } catch (error) {
            console.log(error)
        }
    }
    getproductsPage = async (page, limit, category, usable, sort) => {
        try {
            let query = {};
            category ? (query.category = category.toLowerCase()) : null;
            usable ? (query.status = usable.toLowerCase()) : null;
            Number.parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
            Number.parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
            const products = await productModel.paginate(query, { limit, page, lean: true, sort });
            products.hasPrevPage
                ? (products.prevLink = `/products?page=${products.prevPage}`)
                : (products.prevLink = null);
            products.hasNextPage
                ? (products.nextLink = `/products?page=${products.nextPage}`)
                : (products.nextLink = null);

            return products;
        } catch (error) {
            console.log(error)
        }
    }
    getByCode = async (code) => {
        try {
          return await productModel.findOne({ code });
        } catch (error) {
          throw new Error(error);
        }
      };
  
    getProductsbyId=async (pid)=>{
        try {
            return this.productModel.findOne(pid).lean()
        } catch (error) {
            console.log(error);
        }
    }
    
    createProduct=async (product)=>{
        try {
           
            return this.productModel.create(product)
            
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct=async (pid,product)=>{
        try {
       
            return this.productModel.updateOne({_id:pid},product)  
        } catch (error) {
           console.log(error) 
        }
      
    }
    deleteProduct=async (pid)=>{
        try {
            return this.productModel.deleteOne(pid)
        } catch (error) {
            console.log(error)
        }
    }
}
