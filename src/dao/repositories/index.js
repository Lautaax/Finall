import CartRepository  from "./cart.repository.js";
import ProductsRepository  from "./product.repository.js";
import MessagesRepository  from "./messages.repository.js";
import TicketRepository  from "./ticket.repository.js";
import UserRepository  from "./user.repository.js";

export const cartRepository =new CartRepository();
export const productsRepository= new ProductsRepository();
export const messagesRepository=new MessagesRepository();
export const ticketRepository=new TicketRepository();
export const userRepository=new UserRepository();