import { MarkModel } from '../../model/mark'
import { Request, Response } from 'express'

export const MarkController = {
  insert: async (request: Request, response: Response) => {
    try {
      const {
        body: { name, ...rest },
      } = request
      const nameTreatment = name.toLowerCase()

      if (!nameTreatment) throw 'Name is required!'
      if (await MarkController.verifyMarkExist(nameTreatment))
        throw 'Mark already exists!'

      const insertItems = new MarkModel({ name: nameTreatment, rest })
      await insertItems.save()
      return response.json({
        message: 'New item inserted sucessfull!',
        done: true,
        data: nameTreatment,
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  verifyMarkExist: async (name: string) => {
    return await MarkModel.findOne({ name })
  },
  update: async (request: Request, response: Response) => {
    try {
      const {
        body: { name },
        params: { id },
      } = request

      const findById = await MarkModel.findOneAndUpdate(
        { id },
        {
          name,
        }
      )

      if (!findById) throw 'Id not exist!'
      const findItem = await MarkModel.findOne({ id })

      return response.json({
        message: 'Mark updated sucessfull!',
        done: true,
        data: findItem,
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  // delete: async (request: Request, response: Response) => {
  //   try {
  //     const {
  //       params: { id },
  //     } = request
  //     const findAndRemoveItem = await ProductsCategoryModel.findOneAndDelete({
  //       id,
  //     })
  //     if (!findAndRemoveItem) throw 'Id not exist!'
  //     return response.json({
  //       message: 'Item deleted sucessfull!',
  //       done: true,
  //     })
  //   } catch (err) {
  //     return response.status(400).json({ message: err, done: false })
  //   }
  // },
  // list: async (request: Request, response: Response) => {
  //   const {
  //     query: { search, name, description },
  //   } = request
  //   const data = await CategoryProductController.filter({
  //     search: String(search),
  //     name: String(name),
  //     description: String(description),
  //   })

  //   return response.json({
  //     done: true,
  //     qty: data.length,
  //     data,
  //   })
  // },
  // filter: async ({
  //   search,
  //   name,
  //   description,
  // }: {
  //   search?: string
  //   name?: string
  //   description?: string
  // }) => {
  //   if (search != 'undefined') {
  //     return await ProductsCategoryModel.find({
  //       $or: [
  //         { name: { $regex: `.*${search}.*` } },
  //         { description: { $regex: `.*${search}.*` } },
  //       ],
  //     })
  //   }
  //   if (name !== 'undefined') {
  //     return await ProductsCategoryModel.find({
  //       name: { $regex: `.*${name}.*` },
  //     })
  //   }
  //   if (description !== 'undefined') {
  //     return await ProductsCategoryModel.find({
  //       description: { $regex: `.*${description}.*`, $options: 'i' },
  //     })
  //   }
  //   return await ProductsCategoryModel.find()
  // },
}
