import express from 'express'
import enviroment from './config/enviroment'


const app = express()

const port = enviroment.PORT



app.listen(port, () => {
  console.log(`Serviço em execução: http://localhost:${port}`)
})