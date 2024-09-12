import express from 'express'
import bodyParser from 'body-parser'
import errorHandler from './middlewares/error-middleware'
import enviroment from './config/enviroment'
import routes from './routes'
import CreateUsersScript from './script/create-users-script'
import { EnsureAuthenticated } from './middlewares/ensure-authenticated-middleware'

const port = enviroment.PORT || 3001


const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(EnsureAuthenticated.execute)
app.use(routes)

app.use(errorHandler)

app.listen(port, async() => {
  try{
   await new CreateUsersScript().execute()
   console.info('Usuários criados com sucesso!')
  }catch(error){
    console.log("🚀 ~ app.listen ~ error:", error)
    console.error('Erro ao criar usuários.')
  }
  console.log(`Serviço em execução: http://localhost:${port}`)
})