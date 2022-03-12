import express from 'express'
import { AuthController } from '../controller/auth'
import { MarkController } from '../controller/mark'
import { UserControler } from '../controller/user'
import { AuthMiddleware } from '../middleware/auth'
const route = express.Router()

route.post('/mark', AuthMiddleware, MarkController.insert)
route.post('/user', UserControler.insert)
route.post('/auth', AuthController.authenticate)

export default route
