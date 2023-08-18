import config from "../src/config.js";
import jwt from "jsonwebtoken"

import { userService } from "../src/dao/services/index.js";


const { jwtSecret } = config
function roladm(req, res, next) {

  if (req.user.role === 'user' || req.user.role === undefined || req.user.role==='premium') {
    return res.render("erroraccess")
    //return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function authorize(roles) {
    return async (req, res, next) => {
        const token = req.cookies.jwtCookie;

        if (!token) {
          return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
        }

        try {
            const decodedToken = jwt.verify(token, jwtSecret);
            const currentUser = await userService.findbyuserid({_id:decodedToken.id});
            const hasPermission = roles.some(role => currentUser.role === role);

            if (!hasPermission) {
              return res.status(403).send({ status: 'Error', error: "You cannot access to this place" });
            }

            req.user = currentUser;

            next();
        } catch (error) {
          return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
        }
    };


}
function roluser(req, res, next) {
  if (req.user.role === "admin") {
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function checkLogin(req, res, next) {

  if (!req.user) {
    return res.redirect("/");

  }
  next();
}

function checkLogged(req, res, next) {
  if (req.user) return res.redirect("/products");
  next();
}

export { checkLogged, authorize, checkLogin, roladm, roluser };