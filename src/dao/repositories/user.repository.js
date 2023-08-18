import { userModel } from '../models/user.model.js';

export default class UserRepository {
    constructor(){
        this.model = userModel;
    }
    getallUsers = async () => {
        try {
            return this.model.find();
        } catch (error) {
            console.log(error)
        }
    }

    findWithMail = async (email) => {
        try {
            return await this.model.findOne(email);
        } catch (error) {
            console.log(error)
        }
    };

    createUser = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
             console.log(error)
        }
    };

    findById = async(id) => {
        try {
            return await this.model.findOne(id).lean();
        } catch (error) {
           console.log(error)
        }
    };

    findByCartId = async(cartId) => {
        try {
            return await this.model.findOne({cart: cartId});
        } catch (error) {
             console.log(error)
        }
    }

    updateUser = async (user,updates) => {
        try {
            
            return await this.model.updateOne(user,updates);
        } catch (error) {
             console.log(error)
        }
    }
    updateFunction=async (id,user)=>{
        try {
         
            return await this.model.updateOne({_id:id},user);
            
        } catch (error) {
            console.log(error)
        }
    }
    deleteUserByCartId = async (cartId) => {
        try {
          const deletedUser = await userModel.deleteOne({ cart: cartId })
          return deletedUser
        } catch (error) {
          console.log(error)
        }
      }
    deleteUser = async (userId) => {
        try {
          const deletedUser = await userModel.deleteOne({ _id: userId })
          return deletedUser
        } catch (error) {
          console.log(error)
        }
      }
    deleteInactiveUsers = async (users) => {
        console.log(users)
        try {
          const deletedUser = await userModel.deleteMany({ cart: { $in: users } })
          return deletedUser
        } catch (error) {
          console.log(error)
        }
      }
}


