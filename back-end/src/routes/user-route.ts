import express from 'express'
import UserController from '../controllers/collaborator-controller'

const userRoutes = express.Router()

userRoutes.post('/login',UserController.login)

export default userRoutes