import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { UserModel } from '../../model/user'

export const UserControler = {
  insert: async (request: Request, response: Response) => {
    try {
      const {
        body: { ...rest },
      } = request

      if (!rest.name) throw 'Name is required!'
      if (!rest.password) throw 'Password is required!'
      if (!rest.email) throw 'Email is required!'
      if (await UserControler.verifyMarkExist(rest.email))
        throw 'User already exists!'

      const inserNewUser = new UserModel({
        ...rest,
        password: bcrypt.hashSync(rest.password, 8),
      })
      await inserNewUser.save()
      const { password, ...removedPassword } = rest
      return response.json({
        message: 'New item inserted sucessfull!',
        done: true,
        data: removedPassword,
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
  verifyMarkExist: async (email: string) => {
    return await UserModel.findOne({ email })
  },
}
