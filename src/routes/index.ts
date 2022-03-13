import express from 'express'
import { AuthController } from '../controller/auth'
import { MarkController } from '../controller/mark'
import { ProductController } from '../controller/product'
import { CategoryProductController } from '../controller/productCategory'
import { UserControler } from '../controller/user'
import { AuthMiddleware } from '../middleware/auth'

const route = express.Router()

route.post('/mark', AuthMiddleware, MarkController.insert)
route.get('/mark', AuthMiddleware, MarkController.list)
route.delete('/mark/:id', AuthMiddleware, MarkController.delete)
route.put('/mark/:id', AuthMiddleware, MarkController.update)

route.post('/product', AuthMiddleware, ProductController.insert)
route.get('/product', AuthMiddleware, ProductController.list)

route.get('/product/category', AuthMiddleware, CategoryProductController.list)
route.post(
  '/product/category',
  AuthMiddleware,
  CategoryProductController.insert
)
route.put(
  '/product/category/:id',
  AuthMiddleware,
  CategoryProductController.update
)
route.delete(
  '/product/category/:id',
  AuthMiddleware,
  CategoryProductController.delete
)
route.post('/user', UserControler.insert)
route.post('/auth', AuthController.authenticate)

export default route
