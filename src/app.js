import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js";

import cookieParser from "cookie-parser";

import database from "./db.js";
//import cors from "cors";
import { winstonLogger } from "./utils/logger.js";
import routesFunction from "./routes/app.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import paymentsRouter from "./routes/payment.router.js"
import bodyParser from "body-parser";
import { compare } from './views/helper.js'

//Initialization
const productServer = express();
//Middlewares
productServer.use(bodyParser.json());
productServer.use(bodyParser.urlencoded({extended: true}));

productServer.use(winstonLogger)
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));

//productServer.use(passport.session())

productServer.use(cookieParser())
initializePassport()

// productServer.use(cors());
productServer.use("/api/payments",paymentsRouter)

database.connect();

routesFunction(productServer)
productServer.use(passport.initialize())


//View engine
productServer.engine(
  'handlebars',
  handlebars.engine({
    helpers: {
      compare
    },
    defaultLayout: 'main'
  })
)
//productServer.engine("handlebars", handlebars.engine());
productServer.set("views", `${__dirname}/views`);
productServer.set("view engine", "handlebars");

const httpServer = productServer.listen(8080, (req, res) => {
  try {
    console.log("Listening on port 8080")
  } catch (error) {

    return res.status(500).send({
      status: "error",
      error: "Failed to the connect to the server",
  });
  }
});


//socket.connect(httpServer)




