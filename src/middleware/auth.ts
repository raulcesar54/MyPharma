import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers
  if (!authorization) {
    return response.sendStatus(401)
  }
  const token = authorization.replace('Bearer', '').trim()
  try {
    const data = jwt.verify(token, 'LKABDFBAISDFYWEQNR241985Y19HWSFN91N')
    if (data) {
      next()
    }
  } catch {
    return response
      .status(401)
      .json({ message: 'User not authorized!', done: false })
  }
}
