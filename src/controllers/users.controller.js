import { userService } from "../dao/services/index.js";
import config from "../config.js"
import jwt from "jsonwebtoken"
import CurrentUserDto from "../dao/dtos/current-user-dto.js";
const { jwtSecret,cookieName } = config
export async function updateFunctionuser(req, res) {
  try {



    const user_Id = req.params.uid;


    let user = await userService.findbyuserid({ _id: user_Id });

    if (user.role !== "admin") {

      if (user.role === "user") {
     
        user.role = "premium"
        user = await userService.updateFunction(user_Id, { role: "premium" })
 
      } else {

        user = await userService.updateFunction(user_Id, { role: "user" })

      }
      // result = await userService.updateFunction(user_Id, user);
    }

    // if (!result) {
    //    req.logger.error(`The user with the id ${pid} cannot be update his function`);
    //     return res.send({ status: "error", error: "Incomplete values" });
    // }
 
    return res.send({ status: "user successfully updated", payload: user});
  } catch (error) {
    console.log(error)
  }


}

export const logoutUser = async (req, res) => {
  const { jwtCookie: token } = req.cookies
  const { email } = userService.decodeUser(token)
  const last_connection = userService.updateConnection(email)

  if (!last_connection) {
    req.logger.error('Failed to update last connection')
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to update last connection' })
  }

  return res
    .clearCookie(cookieName)
    .send({ status: 'success', message: 'Logout successful!' })
}

export async function getallTheusers(req,res){
  try {
    const result = await userService.getallUsers()
    let ob=[]

   for (let index = 0; index < result.length; index++) {
    let element = result[index];
    const userResult=new CurrentUserDto(element)
    ob.push(userResult)
   }

    return res.status(201).send({ status: 'success', payload: ob})
  } catch (error) {
    console.log(error)
  }
}
export async function changeroleUser  (req, res){
  try {
    const { uid } = req.params

    if (!uid) {
      return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
      })
    }

    const roleChanged = await userService.changeRole(uid)
    req.user="premium";
    if (!roleChanged) {
      return res
        .status(500)
        .send({ status: 'error', error: 'Failed to change role' })
    }

    return res.status(200).send({
      status: 'success',
      message: `Successfully changed role for user ${uid}`
    })
  } catch (error) {
    req.logger.error(`Failed to change role: ${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}
export const githubLogin = async (req, res) => {}

export const githubCallback = async (req, res) => {
  try {
    const { user } = req

    const token = userService.loginUser(user)

    if (!token) {
      return res
        .status(500)
        .send({ status: 'error', error: 'Failed to generate JWT token' })
    }

    return res.cookie(cookieName, token, { httpOnly: true }).redirect('/products')
  } catch (error) {
    req.logger.error(`Failed to handle GitHub callback with error: ${error}`)
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to handle GitHub callback' })
  }
}

export async function updateUserDocuments(req, res) {
  try {
    const userDocuments = req.files
    const { jwtCookie: token } = req.cookies
    const { email } = jwt.verify(token, jwtSecret, {
      ignoreExpiration: true
    })

    if (Object.keys(userDocuments).length === 0) {
      return res.status(400).send({
        status: 'error',
        error: 'You need to upload at least one file'
      })
    }
    if (!email) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to get user'
      })
    }

    const updatedUserDocumentsAndStatus = await userService.updateUserDocumentsAndStatus(email, userDocuments)

    if (!updatedUserDocumentsAndStatus) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to update user documents and status'
      })
    }

   return res.status(201).send({ status: 'success', payload: "success" })
  } catch (error) {
    console.log(error)
  
    // req.logger.error(`Cannot update user documents with error: ${error}`)
    return res.status(500).send({
      status: 'error',
      error: 'Failed to update user documents and status'
    })
  }
  
}


export async function updateProfile2(req, res){
  try {
    const profilePicture = req.file
    const { jwtCookie: token } = req.cookies
    const { email } = jwt.verify(token, jwtSecret, {
      ignoreExpiration: true
    })

    if (!email) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to get user'
      })
    }

    if (!req.file) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to save profile picture'
      })
    }

    const updatedProfilePicture = await userService.updateProfile2(email, profilePicture)

    if (!updatedProfilePicture) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to update profile picture'
      })
    }

    res.status(201).send({ status: 'success', payload: updatedProfilePicture })
  } catch (error) {
    console.log(error)
    // return res.status(500).send({
    //   status: 'error',
    //   error: 'Failed to update profile images or error in the database'
    // })
  }
}

export async function updateProfile(req, res){
  try {
    const profilePicture = req.file
    const { jwtCookie: token } = req.cookies
    const { email } = jwt.verify(token, jwtSecret, {
      ignoreExpiration: true
    })

    if (!email) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to get user'
      })
    }

    if (!req.file) {
      return res.status(400).send({
        status: 'error',
        error: 'Failed to save profile picture'
      })
    }

    const updatedProfilePicture = await userService.updateProfile(email, profilePicture)

    if (!updatedProfilePicture) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to update profile picture'
      })
    }

    res.status(201).send({ status: 'success', payload: updatedProfilePicture })
  } catch (error) {
    console.log(error)
    // return res.status(500).send({
    //   status: 'error',
    //   error: 'Failed to update profile images or error in the database'
    // })
  }
}
export const deleteForinactivity = async (req, res) => {
  try {
    const allUsers = await userService.getallUsers()
    const {id}=req.user
    console.log(id)
    if (!allUsers) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to get all the users'
      })
    }
    
     const usersTodelete = await userService.deleteInactiveUsers(allUsers,id)

    if (!usersTodelete || usersTodelete.deletedCount === 0) {
      return res.status(404).send({
        status: 'error',
        error: 'No inactive users were found to delete'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: deletedUsers
    })
  } catch (error) {

    req.logger.error(`Cannot delete inactive users with error: ${error}`)
    return res.status(500).send({
      status: 'error',
      error: `${error}`
    })
  }
}
export const deleteUserByCartId = async (req, res) => {
  try {
    const { cid } = req.params

    if (!cid) {
      return res.status(400).send({
        status: 'error',
        error: 'Incomplete values'
      })
    }

    const deletedUser = await userService.deleteUserByCartId(cid)

    if (!deletedUser || deletedUser.deletedCount === 0) {
      return res.status(404).send({
        status: 'error',
        error: `Failed to delete user with cart ID ${cid}`
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: deletedUser
    })
  } catch (error) {
    req.logger.error(`Cannot delete user with error: ${error}`)
    return res.status(500).send({
      status: 'error',
      error: 'Failed to delete user'
    })
  }
}
