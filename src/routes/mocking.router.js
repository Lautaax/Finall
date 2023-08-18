import { Router } from "express";
import { generateProduct } from "../utilsmocking.js";
const mockRouter=Router()
const users=[]
mockRouter.get("/mockingproducts",(req,res)=>{

    for (let i = 0; i < 100; i++) {
        users.push(generateProduct());
      }
    
      return res.send({ status: "success", payload: users });

})

export default mockRouter