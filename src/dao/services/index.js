import CartService from "./cart.service.js";
import ProductsService from "./product.service.js";
import MessageService from "./messages.service.js";
import UserService from "./user.service.js";
import PaymentService from "./payment.service.js";
import TicketService from "./ticket.service.js";


export const cartService= new CartService();
export const productService=new ProductsService();
export const userService=new UserService();
export const messagesService=new MessageService();
export const paymentService=new PaymentService();
export const ticketService=new TicketService();