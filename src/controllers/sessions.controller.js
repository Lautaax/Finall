import CurrentUserDto from "../dao/dtos/current-user-dto.js";

import { userService } from "../dao/services/index.js";
import { isValidPassword } from "../utils.js";
import config from "../config.js";
import jwt from "jsonwebtoken";

const { jwtSecret } = config
export async function registerUser(req, res) {
  return res.send({ status: "Success", message: "User registered" })
}
export async function failRegister(req, res) {
  return res.send({ status: "status", error: "User already exists" })
}
export async function loginUser(req, res) {
  const { email, password } = req.body
  const user = await userService.findWiththemail({ email: email })
  if (!user) return res.status(401).send({ status: "error", error: "User does not exist" })
  if (!isValidPassword(user, password)) return res.status(401).send({ status: "error", error: "Invalid credentials" })
  // if (user.email === "adminCoder@coder.com") {
  //   user.role = "admin"
  // } else {
  //   user.role = "user"
  // }
  const jwtUser = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    email: user.email,
    role: user.role,
    password: "",
    cart: user.cart,
  }

  const accesstoken = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "24h" })
  const last_connection = await userService.updateConnection(jwtUser.email)

  if (!last_connection) {
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to update last connection' })
  }


  return res.cookie("jwtCookie", accesstoken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: jwtUser })
}
export function githubCallback(req, res) {

  const jwtUser = {
    name: req.user.first_name,
    email: req.user.email,
    cart: req.user.cart,
  };

  const token = jwt.sign(jwtUser, jwtSecret, { expiresIn: "24h" })

  res.cookie("jwtCookie", token, { httpOnly: true }).redirect("/products");

}
export async function Logout(req, res) {
  const { jwtCookie: token } = req.cookies
  const { email } = await userService.decodeUser(token)
  const last_connection = await userService.updateConnection(email)

  if (!last_connection) {
    req.logger.error('Failed to update last connection')
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to update last connection' })
  }

  return res.clearCookie("jwtCookie").send({ status: "sucess", message: "Log out sucessfull" })
}
export function failLogin(req, res) {
  res.send({ status: "error", error: "Authentication error" })
}
export function getcurrentUser(req, res) {


  const userDto = new CurrentUserDto(req.user);

  return res.send({ status: "success", payload: userDto })
}