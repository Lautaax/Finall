import { userRepository } from "../repositories/index.js";
import jwt from "jsonwebtoken"
import config from "../../config.js";
import { sendEmailtousersdeletedforinactivity } from "../../controllers/mail.controller.js";
import CurrentUserDto from "../dtos/current-user-dto.js";
const { jwtSecret } = config
export default class UserService {
  constructor() {
    this.userRepository = userRepository
  }
  getallUsers = async () => {
    try {
      return await this.userRepository.getallUsers();
    } catch (error) {
      console.log(error)
    }
  }
  findWiththemail = async (email) => {
    try {
      return await this.userRepository.findWithMail(email);
    } catch (error) {
      console.log(error)
    }
  }
  createtheUser = async (user) => {
    try {
      return await this.userRepository.createUser(user)
    } catch (error) {
      console.log(error)
    }
  }
  loginUser(user, rememberMe) {
    try {
      const userDTO = new CurrentUserDto(user)

      const jwtUser = JSON.parse(JSON.stringify(userDTO))

      const expireTime = rememberMe ? '7d' : '3h'

      const token = jwt.sign(jwtUser, jwtSecret, {
        expiresIn: expireTime
      })
      if (!token) throw new Error('Auth token signing failed')

      return token
    } catch (error) {
      throw error
    }
  }

  findbyuserid = async (id) => {
    try {
      return await this.userRepository.findById(id)
    } catch (error) {

    }
  }
  findbytheId = async (id) => {
    try {
      return await this.userRepository.findByCartId(id);
    } catch (error) {
      console.log(error);
    }
  }
  findbytheCartUser = async (cartId) => {
    try {


      return await this.userRepository.findByCartId(cartId)
    } catch (error) {
      console.log(error)
    }
  }
  updatetheUser = async (user) => {
    try {
      return await this.userRepository.updateUser(user);
    } catch (error) {
      console.log(error)
    }
  }
  updateFunction = async (id, user) => {
    try {

      return await this.userRepository.updateFunction(id, user);
    } catch (error) {
      console.log("error")
    }
  }

  async updateUserDocumentsAndStatus(email, userDocuments) {
    try {
      const newUserStatus = []
      const newUserDocuments = []

      const { documents } = await userRepository.findWithMail({ email })

      Object.values(userDocuments).forEach((els) => {
        els.forEach((el) => {
          const document = {
            name: el.fieldname,
            reference: `${el.fieldname}/${el.filename}`
          }
          newUserDocuments.push(document)
        })
      })

      newUserDocuments.forEach((newUserDoc) => {
        const existingDocIndex = documents.findIndex(
          (doc) => doc.name === newUserDoc.name
        )
        if (existingDocIndex !== -1) {
          documents[existingDocIndex] = newUserDoc
        } else {
          documents.push(newUserDoc)
        }
      })

      documents.forEach((el) => {
        newUserStatus.push(el.name)
      })

      const updates = {
        documents,
        status: newUserStatus
      }

      const updatedUserDocumentsAndStatus = await userRepository.updateUser({ email: email }, updates)

      return updatedUserDocumentsAndStatus
    } catch (error) {
      console.log(`Failed to update user documents and status with error: ${error}`)
      throw error
    }
  }
  async changeRole(uid) {
    try {
      const requireStatus = ['identification', 'address', 'statement']
      const user = await userRepository.findById({ _id: uid })

      let missingStatus = []
      let roleChanged = false

      if (!user) {
        const user = await userRepository.findByCartId(uid)
        const userStatus = user.status
        let role = ""
        missingStatus = requireStatus.filter((el) => !userStatus.includes(el))

        if (requireStatus.every((el) => userStatus.includes(el)) || user.role === 'premium') {
          const role = user.role === 'user' ? 'premium' : 'user'

          roleChanged = await userRepository.updateUser(
            { cart: uid },
            { role: role }
          )
        } else {
          throw new Error(`You're missing documents to change your role: ${missingStatus.join(', ')}`)
        }
      } else {
        const userStatus = user.status

        missingStatus = requireStatus.filter((el) => !userStatus.includes(el))

        if (requireStatus.every((el) => userStatus.includes(el)) || user.role === 'premium') {
          if (user.role === 'user') {
            role = 'premium'
          } else {
            role = 'user'
          }

          roleChanged = await userRepository.updateUser(
            { _id: uid },
            { role }
          )
        } else {
          throw new Error(`You're missing documentantion to change your role: ${missingStatus.join(', ')}`)
        }
      }

      if (!roleChanged) { throw new Error(`Failed to change role for user ${uid}`) }

      return roleChanged
    } catch (error) {
      console.log(`Failed to change role: ${error}`)
      throw error
    }
  }
  updateConnection(email) {
    try {
      const connectionupd = userRepository.updateUser(
        { email: email },
        { last_connection: new Date() }
      )
      if (!connectionupd) throw new Error('Error updating user last connection')

      return connectionupd
    } catch (error) {
      console.log(`Failed to update last connection with error: ${error}`)
      throw error
    }
  }
  async decodeUser(token) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret, {
        ignoreExpiration: true
      })
      return decodedToken
    } catch (error) {
      throw error
    }
  }
  async updateProfile2(email, profilePicture) {
    try {
      const newUserDocuments = []
      const { documents } = await userRepository.findById({ email })

      const documentUser = {
        name: profilePicture.fieldname,
        reference: `${profilePicture.fieldname}/${profilePicture.filename}`
      }
      newUserDocuments.push(documentUser)

      newUserDocuments.forEach((newUserDoc) => {
        const existingDoc = documents.findIndex(
          (doc) => doc.name === newUserDoc.name
        )
        if (existingDoc !== -1) {
          documents[existingDoc] = newUserDoc
        } else {
          documents.push(newUserDoc)
        }
      })

      const updatedUserDocumentsAndStatus = await userRepository.updateUser({ email }, { documents })

      return updatedUserDocumentsAndStatus
    } catch (error) {
      console.log(`Failed to update user documents and status with error: ${error}`)
      throw error
    }
  }
  async updateProfile(email, profilePicture) {
    try {
      const newUserDocuments = []
      const { documents } = await userRepository.findById({ email })

      const documentUser = {
        name: profilePicture.fieldname,
        reference: `${profilePicture.fieldname}/${profilePicture.filename}`
      }
      newUserDocuments.push(documentUser)

      newUserDocuments.forEach((newUserDoc) => {
        const existingDoc = documents.findIndex(
          (doc) => doc.name === newUserDoc.name
        )
        if (existingDoc !== -1) {
          documents[existingDoc] = newUserDoc
        } else {
          documents.push(newUserDoc)
        }
      })

      const updatedUserDocumentsAndStatus = await userRepository.updateUser({ email }, { documents })

      return updatedUserDocumentsAndStatus
    } catch (error) {
      console.log(`Failed to update user documents and status with error: ${error}`)
      throw error
    }
  }
  async deleteUser(uid) {
    try {
      const deletedUser = await userRepository.deleteUser(uid)
      if (!deletedUser) throw new Error(`Error deleting user ${uid}`)

      return deletedUser
    } catch (error) {
      throw error
    }
  }
  async deleteUserByCartId(cid) {
    try {
      const deletedUser = await userRepository.deleteUserByCartId(cid)
      if (!deletedUser) throw new Error(`Error deleting user ${cid}`)

      return deletedUser
    } catch (error) {
      throw error
    }
  }
  async deleteInactiveUsers(users, id) {
    try {
       const twoDays = 2 * 24 * 60 * 60 * 1000
    
      const currentTime = new Date()
     
     let usersTodelete
     let deletedUsers
      let inactiveUsers = users.filter((user) => {
        const lastConnection = new Date(user.last_connection)
      
        const timeDiff = currentTime - lastConnection
       
        return timeDiff > twoDays
     
      })

    if (inactiveUsers.length === 0){
      deletedUsers=null
      return deletedUsers

    } 
     usersTodelete = inactiveUsers.filter((user1) => {
        return user1.id !== id
      })
      


      const inactiveUserIds = usersTodelete.map((user) => user.cart)

      deletedUsers = await userRepository.deleteInactiveUsers(inactiveUserIds)

      inactiveUsers.forEach(async (user) => {
        // const mail = {
        //   to: user.email,
        //   subject: 'Informatic supplies - Account Deletion Notification',
        //   html: emailTemplates.accountDeletionEmail(user.name, user.email)
        // }
       await sendEmailtousersdeletedforinactivity(user.email)
      })

      if (!deletedUsers) throw new Error(`Error deleting user ${uid}`)
    
      return deletedUsers
    } catch (error) {
      throw error
    }
  }


}

