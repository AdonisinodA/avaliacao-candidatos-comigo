import express from 'express'
import userRoutes from './user-route'
import ticketRoutes from './ticket-route'
import { VehicleController } from '../controllers/vehicle-controller'
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated-middleware'


const routes = express.Router()


routes.use('/user',userRoutes)
routes.use('/ticket',ticketRoutes)
routes.get('/vehicle/list', EnsureAuthenticated.execute,new VehicleController().listVehicles)



export default routes