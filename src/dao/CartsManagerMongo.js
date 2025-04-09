const cartModel = require ("./models/cartsModel")

class CartsManagerMongo{
  static async get() {
    return await cartModel.find().lean()
  }

  static async getBy(filtro={}){
    return await cartModel.findOne(filtro).lean()
  }

  static async save(products){
    let nuevoCart=await cartModel.create({products})
    return nuevoCart
  }

  static async update(id, aModificar) {
    return await cartModel.findByIdAndUpdate(id, aModificar, {new: true}).lean()
  }

  // static async delete(id) {
  //   return await cartModel.findByIdAndDelete(id, {}).lean()
  // } 
}

module.exports = CartsManagerMongo

