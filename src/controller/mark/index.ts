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
}
