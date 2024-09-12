import express from 'express'
import userRoutes from './user-route'
import ticketRoutes from './ticket-route'


const routes = express.Router()


routes.use('/user',userRoutes)
routes.use('/ticket',ticketRoutes)



export default routes