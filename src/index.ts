import express from 'express'
import bodyParser from 'body-parser'
import errorHandler from './middlewares/error'
import enviroment from './config/enviroment'

const port = enviroment.PORT


const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.use(errorHandler)

app.listen(port, () => {
  console.log(`Serviço em execução: http://localhost:${port}`)
})