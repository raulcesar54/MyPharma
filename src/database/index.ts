import mongoose from 'mongoose'
export async function connectMongoo() {
  try {
    await mongoose.connect(
      'mongodb+srv://raulsouza:raulsouza@cluster0.pyezg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    console.log('conectado com sucesso!')
  } catch (err) {
    console.error('erro ao conectar com mongo!')
  }
}
