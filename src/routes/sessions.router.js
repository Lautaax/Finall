import { Router } from "express";
import { registerUser ,loginUser,failRegister,Logout,failLogin,getcurrentUser} from "../controllers/sessions.controller.js";
import passport from "passport";
import { githubCallback,githubLogin} from "../controllers/users.controller.js";
import jwt from "jsonwebtoken";
const router = Router()
router.post("/register", passport.authenticate("register", {session:false,failureRedirect: "/api/sessions/failRegister" }), registerUser)


router.get("/failRegister",failRegister)


router.post("/login",loginUser);


router.get("/failLogin",failLogin)


router.get("/current",passport.authenticate("jwt",{session:false}),getcurrentUser)

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }),(req,res)=>{

})

router.get("/githubcallback",passport.authenticate("github", { session: false, failureRedirect: '/' }),githubCallback)

router.get("/logout",passport.authenticate("jwt", { session: false }),Logout);
export default router;