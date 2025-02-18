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

  async addProduct(title, description, code, price, status, stock, category, thumbnails) {
    //obtiene lo que ya hay en el archivo
    let productos = await this.getProducts()

    //encuentra el id máximo y asigna un nuevo id consecutivo (snippet del profe)
    let id = 1
    if (productos.length > 0) {
      id = Math.max(...productos.map(p => p.id)) + 1
    }

    let nuevoProducto = {
      id,
      title, description, code, price, status, stock, category, thumbnails
    }

    // ---ME FALTA--- validar que sean strings, numeros, etc

    //agrega lo nuevo al archivo
    productos.push(nuevoProducto)
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    return nuevoProducto
  }
}

module.exports={ProductsManager}


// const app = async()=>{
//   const productsManager = new ProductsManager("./src/data/products.json")
//   // console.log(await productsManager.getProducts())

//   console.log(await productsManager.addProduct("Borrador","Borrador clásico", "HAB125",15, true, 30, "Herramientas", []))
//   console.log(await productsManager.getProducts())


// }

// app()



