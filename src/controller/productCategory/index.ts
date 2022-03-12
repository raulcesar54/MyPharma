import { Request, Response } from 'express'
import { ProductsCategoryModel } from '../../model/productsCategory'

export const CategoryProductController = {
  insert: async (request: Request, response: Response) => {
    try {
      const {
        body: { name, description },
      } = request

      if (!name) throw 'Name is required!'
      if (!description) throw 'Description is required!'

      const insertItems = new ProductsCategoryModel({ name, description })
      await insertItems.save()
      return response.json({
        message: 'New item inserted sucessfull!',
        done: true,
        data: { name, description },
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const {
        body: { name, description },
        params: { id },
      } = request

      const findById = await ProductsCategoryModel.findOneAndUpdate(
        { id },
        {
          name,
          description,
        }
      )

      if (!findById) throw 'Id not exist!'
      const findItem = await ProductsCategoryModel.findOne({ id })

      return response.json({
        message: 'Item updated sucessfull!',
        done: true,
        data: findItem,
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const {
        params: { id },
      } = request
      const findAndRemoveItem = await ProductsCategoryModel.findOneAndDelete({
        id,
      })
      if (!findAndRemoveItem) throw 'Id not exist!'
      return response.json({
        message: 'Item deleted sucessfull!',
        done: true,
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  list: async (request: Request, response: Response) => {},
}
