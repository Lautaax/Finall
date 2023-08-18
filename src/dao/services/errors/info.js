
  export const addProductErrorInfo = (product) => {
    return `One or more properties were incomplete or invalid:
    * title: required String, received ${product.title}
    * description: required String, received ${product.description}
    * code: required String, received ${product.code}
    * price: required Number, received ${product.price}
    * stock: required Number, received ${product.stock}
    * category: required String, received ${product.category}`;
  };
  
  export const CartErrorInfo = (cart,quantity) => {
    return `One or more properties were incomplete or invalid:
    * cid (Cart ID): required String, received ${cart.cid}
    * pid (Product ID): required String, received ${cart.pid}
    * quantity: required Number, received ${quantity}`
  };
  
  export const authenticationErrorInfo = () => {
    return "Access denied to the page. Authentication credentials were incorrect.";
  };
  
