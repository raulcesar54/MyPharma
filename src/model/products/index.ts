import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const schema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  productsCategory: { type: String, ref: 'productsCategory' },
  mark: { type: String, ref: 'mark' },
  description: { type: String, required: true },
})

export const ProductsModel = mongoose.model('products', schema)
