import loggerRouter from "./loggertest.router.js"
import productsRouter from './products.router.js';
import mailRouter from './mail.router.js'
import cartrouter from './cart.router.js'
import viewrouter from './views.router.js'
import mockRouter from "./mocking.router.js";
import sessionsRouter from "./sessions.router.js"
import usersRouter from "./users.router.js"
import messagesRouter from "./chat.router.js"
import smsRouter from "./sms.router.js"
import { authToken } from "../utilsjwt.js";
import __dirname from "../dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import paymentRouter from "./payment.router.js"
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Informatic supplies API",
      description: "Documentacíon que soporta al eccomerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
const routesFunction = (productServer) => {
  

  productServer.get("/mockingproducts", mockRouter)
  productServer.use("/recovery", mailRouter)
  productServer.get("/sms", smsRouter)
  productServer.use("/chat",messagesRouter);
  productServer.use("/api/sessions", sessionsRouter);
  //productServer.get("/loggerTest",loggerRouter)
  productServer.use("/api/products", productsRouter);
  productServer.get("/loggerTest", loggerRouter);
  productServer.use("/api/carts", cartrouter);
  productServer.use("/api/users", usersRouter)
  productServer.use("/", viewrouter);
   productServer.use("/apidocs",swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
  productServer.use("/get",authToken,(req,res)=>{
    res.send({status:"success",payload: req.user})
  })
  productServer.use('/api/payments', paymentRouter)
};

export default routesFunction;

