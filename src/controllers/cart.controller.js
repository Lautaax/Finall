import { cartService,ticketService,userService,productService } from "../dao/services/index.js";
export async function createCart(req, res) {
    try {
        const cart = req.body;
        const createdCart = await cartService.createCart(cart);    
      if (!createdCart) {
        return res
          .status(400)
          .send({ status: "error", message: "Error to create cart", error: "No se pudo crear el carrito" });
      }
      return res.send({ status: "success", message: "cart created", payload: createdCart});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
export async function getCartsall(req, res) {
    try {
        const consulta = await cartService.getCarts();
        return res.send({ status: "Success", payload: consulta });
    } catch (error) {
        req.logger.error(`Cannot get all the carts ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to load the carts",
        });
    }
}

export async function getCartbyId(req, res) {
    try {
        const cartId = req.params.cid;

        const cart = await cartService.getCartsbyId(cartId);

        if (!cart) {

            return res.status(404).send({
                status: "Error",
                error: "Cart was not found",
            });
        }
        return res.send({ status: "OK", message: "Cart found", payload: cart });

    } catch (error) {
        req.logger.error(`Error to get the cart ${error}`)
        return res.status(500).send({
            status: "error",
            error: "Cannot get cart with mongoose",
        });
    }
}
export async function addProductcart(req, res) {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        let resul = {}

        let prod = await productService.getProductsbyitsId({_id:pId});
       // let user=await userService.findbyuserid({_id:req.user.id})
        console.log(prod.stock)
        if(prod.stock === 0){
            return res
                     .status(400)
                     .send({ status: "error", error: resul });
        }else{
            resul = await cartService.addProductCart(cId, pId, quantity);
        }
      
    

        // if (!resul || typeof resul === "string") {
        //     return res
        //         .status(400)
        //         .send({ status: "error", error: resul });
        // }
        // return res.send({ status: "success", payload: resul });
           return res.send({ status: "success", payload: "paso" });

    } catch (error) {
        
        req.logger.error(`Cannot add products to the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to add products to the cart",
        });
    }
}
export async function updatetheCart(req, res) {
    try {
        const id = req.params.cid
        const valor = req.body;
        const result = await cartService.updateCart(id, valor)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be updated" });
        }
        return res.send({ status: "success", payload: result });
    } catch (error) {
        req.logger.error(`Cannot update the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to update the cart",
        });
    }
}
export async function updateProductFromtheCart(req, res) {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body


        let resul = await cartService.updateProductFromCart(cId, pId, quantity);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        req.logger.error(`Cannot update the quantity of products of the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to update the quantity of products of the cart",
        });
    }
}
export async function deletetheCart(req, res) {
    try {

        const cId = req.params.cid;

        let resultado = await cartService.deleteCart(cId);
        if (!resultado) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be eliminated" });
        }
        return res.send({ status: "success", payload: resultado });
    } catch (error) {
        req.logger.error(`Cannot to delete the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to delete the cart",
        });
    }
}
export async function deleteproductFromthecart(req, res) {
    try {
        const { cid, pid } = req.params



        let resul = await cartService.deleteproductfromCart(cid, pid);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        console.log(error)
        // req.logger.error(`Cannot update the quantity of products of the cart with mongoose ${error}`);
        // return res.status(500).send({
        //     status: "error",
        //     error: "Failed to delete products from the cart",
        // });
    }
}
export async function purchase(req, res) {
    try {
        const { cid } = req.params

        const response = await ticketService.createTickettoCart(cid)
        if (!response) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: response });
    } catch (error) {
        req.logger.error(`Failed to make a ticket with mongoose`);
        return res.status(500).send({
            status: "error",
            error: "Failed to make the ticket",
        });
    }

}