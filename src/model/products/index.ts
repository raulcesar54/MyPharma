import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Number, required: true },
  mark: { type: Number, required: true },
  description: { type: String, required: true },
})

export const ProductsModel = mongoose.model('products', schema)