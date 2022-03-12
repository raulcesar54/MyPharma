import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const UserModel = mongoose.model('user', schema)