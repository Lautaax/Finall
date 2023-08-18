
import passport from "passport";
import { Router } from "express";
import { roladm,roluser} from '../../middlewares/auth.js';
import { getCartsall ,getCartbyId,addProductcart,updatetheCart,updateProductFromtheCart,deletetheCart,deleteproductFromthecart,purchase,createCart} from "../controllers/cart.controller.js";
const router = Router();

router.get("/", getCartsall);

router.post("/createcart",createCart)
router.get("/:cid", getCartbyId)
router.put("/:cid",passport.authenticate("jwt",{session:false}),updatetheCart)
router.delete("/:cid",deletetheCart)


router.post("/:cid/product/:pid",passport.authenticate("jwt",{session:false}),addProductcart)
router.delete("/:cid/product/:pid", deleteproductFromthecart)
router.put("/:cid/product/:pid",updateProductFromtheCart)

router.get("/:cid/purchase",purchase)



export default router;