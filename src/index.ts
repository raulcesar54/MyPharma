import { connectMongoo } from './database'
import route from './routes'
import express from 'express'

const cors = require('cors')
const app = express()

connectMongoo()

app.use(express.json())
app.use(cors())
app.use(route)
app.listen(5421, () => console.log('Servidor em execução 👍'))
