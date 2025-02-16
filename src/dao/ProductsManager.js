const fs = require("fs")

class ProductsManager{
  constructor(rutaArchivo) {
    this.path = rutaArchivo
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
    } else {
      return []
    }
  }

  async addProduct(description, thumbnail) {
    let productos = await this.getProducts()

    let id = 1
    if (productos.length > 0) {
      id = Math.max(...productos.map(d => d.id)) + 1
    }

    let nuevoProducto = {
      id,
      description, thumbnail
    }

    productos.push(nuevoProducto)
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    return nuevoProducto
  }
}




const app = async()=>{
  const productsManager = new ProductsManager("./src/data/productos.json")
  console.log(await productsManager.getProducts())

  // console.log(await productsManager.addProduct("plato",""))
  // console.log(await productsManager.addProduct("tenedor","thumbnail"))




}


app()













// const fs=require("fs")

// class UsersManager{
//     constructor(rutaArchivo){
//         this.path=rutaArchivo
//     }

//     async getUsers(){
//         if(fs.existsSync(this.path)){
//             return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
//         }else{
//             // throw new Error(`${this.path} not found...!!! :(`)
//             return []
//         }
//     }

//     async addUser(nombre, edad){
//         let usuarios=await this.getUsers()

//         let id=1
//         if(usuarios.length>0){
//             id=Math.max(...usuarios.map(d=>d.id))+1
//         }

//         // validaciones pertinentes... 

//         let nuevoUsuario={
//             id, 
//             nombre, edad
//         }

//         usuarios.push(nuevoUsuario)
//         await fs.promises.writeFile(this.path, JSON.stringify(usuarios, null, "\t"))
//         return nuevoUsuario
//     }
// }

// let datos={
//     dato01:100, 
//     dato02:200
// }

// module.exports={
//     UsersManager, 
//     datos
// }

