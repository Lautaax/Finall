import passport from 'passport';
import { getViewProducts,getProductwithitsid , getCartwithitsId,loginView,registerView,productsInformation,chatView,ticket,mailtorecovery,recoverpassword,formproducts,getAdminview,viewPayment,profileView} from '../controllers/views.controller.js';
import { Router } from "express";
 import { roladm} from '../../middlewares/auth.js';

const router = Router();

router.get("/products",passport.authenticate("jwt", { session: false }), getViewProducts)
router.get("/payments",viewPayment)
router.get("/product/:pid",passport.authenticate("jwt",{session: false}),getProductwithitsid);

router.get("/cart/:cid",passport.authenticate("jwt",{session:false}),getCartwithitsId);
router.get("/cart/:cid/purchase",passport.authenticate("jwt",{session:false}),ticket)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  profileView
)

router.get("/",loginView);
router.get("/admin",passport.authenticate("jwt",{session:false}),roladm,getAdminview)
router.get("/register", registerView);

router.get("/formemailrecovery", mailtorecovery)
router.get("/recoverypassword/:token",recoverpassword)
router.get("/products", productsInformation);
router.get("/form-products",formproducts)
router.get(
    "/chat",
    
    chatView
  );
export default router;


