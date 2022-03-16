import { Request, Response } from 'express'
import { ProductsModel } from '../../model/products'

export const ProductController = {
  insert: async (request: Request, response: Response) => {
    try {
      const {
        body: { name, price, stock, productsCategory, mark, description },
      } = request

      if (!name) throw 'Name is required!'
      if (!price) throw 'Price is required!'
      if (!stock) throw 'Stock is required!'
      if (!productsCategory) throw 'Category is required!'
      if (!mark) throw 'Mark is required!'
      if (!description) throw 'Description is required!'

      const insertItems = new ProductsModel({
        name,
        price,
        stock,
        productsCategory,
        mark,
        description,
      })
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
        body: { name, price, stock, productsCategory, mark, description },
        params: { id },
      } = request

      const findById = await ProductsModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          price,
          stock,
          productsCategory,
          mark,
          description,
        }
      )

      if (!findById) throw 'Id not exist!'
      const findItem = await ProductsModel.findOne({ _id: id })

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
      const findAndRemoveItem = await ProductsModel.findOneAndDelete({
        id: id,
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
  list: async (request: Request, response: Response) => {
    const {
      query: { search, name, description },
    } = request
    const data = await ProductController.filter({
      search: String(search),
      name: String(name),
      description: String(description),
    })

    return response.json({
      done: true,
      qty: data.length,
      data,
    })
  },
  filter: async ({
    search,
    name,
    description,
  }: {
    search?: string
    name?: string
    description?: string
  }) => {
    if (search != 'undefined') {
      return await ProductsModel.find({
        $or: [
          { name: { $regex: `.*${search}.*` } },
          { description: { $regex: `.*${search}.*` } },
        ],
      })
        .populate('productsCategory')
        .populate('mark')
    }
    if (name !== 'undefined') {
      return await ProductsModel.find({
        name: { $regex: `.*${name}.*` },
      })
        .populate('productsCategory')
        .populate('mark')
    }
    if (description !== 'undefined') {
      return await ProductsModel.find({
        description: { $regex: `.*${description}.*`, $options: 'i' },
      })
        .populate('productsCategory')
        .populate('mark')
    }
    return await ProductsModel.find()
      .populate('productsCategory')
      .populate('mark')
  },
}
