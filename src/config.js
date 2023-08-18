import dotenv from "dotenv"
dotenv.config();

import { environment } from "./config/commander.js";


dotenv.config({
    path: environment === "DEVELOPMENT" ? "./.env.dev" : "./.env.prod",
  }); 
  
const secret=process.env.SESSION_SECRET
const connectiondatabase=process.env.DB_URL
const config ={
    dbUrl: connectiondatabase,
    sessionSecret: secret,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL,
    mode:process.env.DEVELOPMENT_MODE,
    jwtSecret: process.env.JWT_SECRET,
    cookieName:process.env.COOKIE_NAME,
    loggermode:process.env.LOGGER,
    adminEmail:process.env.ADMIN_EMAIL,
    adminPass:process.env.ADMIN_PASSWORD,
    stripeSecret:process.env.STRIPE_SECRET
    
}
export default config