import { productService,cartService,messagesService,ticketService,userService } from '../dao/services/index.js';

import __dirname from '../dirname.js';
import config from "../config.js";
import jwt from "jsonwebtoken"
export async function getViewProducts(req,res){

    

    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
      } = await productService.getProductsfilterPage(page, limit, category, usable, sort);

 
      res.render("products", {
      
        user:req.user,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        title:'Product list'
      });
}

export const profileView = async (req, res) => {
  try {
    const { email } = req.user
    const user = await userService.findWiththemail({email:email})
    const profilePicture = user.documents?.find((doc) => doc.name === 'profile')?.reference

    res.render('profile', {
      user: req.user,
      profilePicture,
      style: 'styles.css',
      title: 'Your Profile'
    })
  } catch (error) {
    
    req.logger.error(`Failed to render profile view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render profile view' })
  }
}
export async function getProductwithitsid(req,res){
    const { pid } = req.params;
    
    const product = await productService.getProductsbyitsId({_id:pid});
    res.render("product", {
      user:req.user,

      product,
      title:'Product details'
  
    });
}
export async function viewPayment(req,res){
  return res.render("payments",{
    title:'payments'
  })
}
export async function getCartwithitsId(req,res){
    const { cid } = req.params;
    const cart = await cartService.getCartsbyId(cid);

    res.render("cart", {
      cart,
      title:"Cart",
      user:req.user
    });
}
export async function ticket(req,res){
  const { cid }=req.params

  const ticketFinal= await ticketService.createTickettoCart(cid)
  
  res.render("ticket",{
    ticketFinal: JSON.parse(JSON.stringify(ticketFinal)),
    user: req.user,
    title:'Ticket'
  })

}

export function mailtorecovery(req,res){
  return res.render("formemailrecovery",{
    title:'Recovery form'
  })
}
export async function recoverpassword(req,res){

  const { token} = req.params;

  const decodedToken = jwt.verify(token,config.sessionSecret);

  const recUser = await userService.findbyuserid({email:decodedToken.email})

  return res.render("recoverypassword",{
    title:'Recovery password'
  })
}
export function loginView(req,res){

   return res.render("login",{
    title: 'Login'
   });
}
export function registerView(req,res){
    return res.render("register",{
      title:'Register'
    });
}
export async function getAdminview(req,res){
  try {
    const users = await userService.getallUsers()
    
    const parsedUsers = users.map((user) => {
      const parsedDate = new Date(user.last_connection)
      const parsedUser = { ...user }
      parsedUser.last_connection = parsedDate.toLocaleString()
      return parsedUser
    })

    res.render('admin', {
      parsedUsers,
      user:req.user,
      //style: 'styles.css',
       title: 'Admin Panel'
    })
  } catch (error) {
    req.logger.error(`Failed to render admin view: ${error}`)
    res
      .status(500)
      .send({ status: 'error', error: 'Failed to render admin view' })
  }
}
export function formproducts(req,res){
  return res.render("form-products")
}
export function productsInformation(req,res){
  return res.render("products", { user: req.user });
}
export const chatView = async (req, res) => {
  try {
    const messages = await messagesService.getMessages();
    
    res.render("chat", {
      user:req.user,
      messages,
      style: "styles.css",
      title: "Chat",
    });

    if (!messages) {
      return res.status(404).render("error", {
        message: "Error 404: Messages not found",
      
   
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: "Failed to render chat view" });
  }
};