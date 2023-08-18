import { Router } from "express";
import { uploader } from '../dirname.js';
import { getProducts,getProductsbyId,addProducts,updateProducts,deleteProducts} from "../controllers/products.controller.js";
import { authorize } from "../../middlewares/auth.js";
import passport from "passport";
const router = Router();

router.get("/", getProducts);
router.get("/:pid",passport.authenticate("jwt",{session:false}), getProductsbyId);
router.post("/",passport.authenticate("jwt",{session:false}),authorize(['admin', 'premium']),uploader.array("thumbnails"),addProducts)
router.put("/:pid",passport.authenticate("jwt",{session:false}),authorize(['admin','premium']),uploader.array("thumbnails"),updateProducts);
router.delete("/:pid",passport.authenticate("jwt",{session:false}),authorize(['admin','premium']),deleteProducts);
export default router;