import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../model/user'

export const AuthController = {
  authenticate: async (request: Request, response: Response) => {
    try {
      const {
        body: { email, password },
      } = request
      if (!email) throw 'Email is required!'
      if (!password) throw 'Passowrd is required!'

      const user = await UserModel.findOne({ email })
      console.log(user)
      if (!user) throw 'User not exists!'

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return response
          .status(400)
          .json({ message: 'Password Invalid', done: false })
      }

      const token = jwt.sign(
        { id: user._id, email },
        'LKABDFBAISDFYWEQNR241985Y19HWSFN91N',
        { expiresIn: '1d' }
      )
      return response.json({
        message: 'New item inserted sucessfull!',
        done: true,
        data: {
          user: {
            id: user._id,
            email,
          },
          token,
        },
      })
    } catch (err) {
      return response.status(400).json({ message: err, done: false })
    }
  },
}
