import express from 'express'
import UserController from '../controllers/user-controler'

const userRoutes = express.Router()

userRoutes.post('/login',UserController.login)

export default userRoutes