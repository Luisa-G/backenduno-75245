const productModel = require("./models/productsModel")


class ProductsManagerMongo{
  static async get() {
    return await productModel.find().lean()
  }

  static async getBy(filtro={}){
    return await productModel.findOne(filtro).lean()
  }

  static async save(product){
    let nuevoProducto=await productModel.create(product)
    return nuevoProducto.toJSON()
  }

  static async update(id, aModificar) {
    return await productModel.findByIdAndUpdate(id, aModificar, {new: true}).lean()
  }

  static async delete(id) {
    return await productModel.findByIdAndDelete(id, {}).lean()
  } 
}

module.exports=ProductsManagerMongo;
