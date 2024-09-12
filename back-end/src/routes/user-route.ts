import express from 'express'
import UserController from '../controllers/user-controller'

const userRoutes = express.Router()

userRoutes.post('/login',UserController.login)

export default userRoutes