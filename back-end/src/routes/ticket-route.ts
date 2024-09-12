import express from 'express'
import TicketController from '../controllers/ticket-controller'
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated-middleware'
import PermissionsMiddleware from '../middlewares/permissions-middleware'

const ticketRoutes = express.Router()

ticketRoutes.post('/',EnsureAuthenticated.execute,PermissionsMiddleware.execute('colaborador'),TicketController.create)
ticketRoutes.get('/list',EnsureAuthenticated.execute,PermissionsMiddleware.execute('colaborador'),TicketController.list)
ticketRoutes.put('/edit/:ticket_id',EnsureAuthenticated.execute,PermissionsMiddleware.execute('adm'),TicketController.edit)
ticketRoutes.delete('/delete/:ticket_id',EnsureAuthenticated.execute,PermissionsMiddleware.execute('adm'),TicketController.delete)



export default ticketRoutes