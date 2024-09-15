import express from 'express'
import TicketController from '../controllers/ticket-controller'
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated-middleware'
import PermissionsMiddleware from '../middlewares/permissions-middleware'

const ticketRoutes = express.Router()

ticketRoutes.post('/',EnsureAuthenticated.execute,PermissionsMiddleware.execute('atendente'),TicketController.create)
ticketRoutes.get('/list',EnsureAuthenticated.execute,PermissionsMiddleware.execute('atendente'),TicketController.list)
ticketRoutes.put('/edit/:ticket_id',EnsureAuthenticated.execute,PermissionsMiddleware.execute('admin'),TicketController.edit)
ticketRoutes.delete('/delete/:ticket_id',EnsureAuthenticated.execute,PermissionsMiddleware.execute('admin'),TicketController.delete)



export default ticketRoutes