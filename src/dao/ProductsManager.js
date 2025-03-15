const fs=require("fs")

class ProductsManager{
  constructor(rutaArchivo){
    this.path=rutaArchivo
  }

  async getProducts() {
    if(fs.existsSync(this.path)){
      return JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
    }else{
      return []
    }
  }

  async getProductById(pid){
    pid=Number(pid);
    if(isNaN(pid)){
      throw new Error("Ingrese un id tipo number")
    }

    //obtiene lo que ya hay en el archivo
    let productos=await this.getProducts()

    //busca en el archivo
    let producto=productos.find(p=>p.id==pid)

    if(!producto){
      throw new Error(`No existen productos con el id ${pid}`)
    }

    return producto
  }


  async addProduct(title, description, code, price, status, stock, category, thumbnails){
    //obtiene lo que ya hay en el archivo
    let productos=await this.getProducts()

    //encuentra el id máximo y asigna un nuevo id consecutivo (snippet del profe)
    let id=1
    if(productos.length>0){
      id=Math.max(...productos.map(p=>p.id))+1
    }

    let nuevoProducto={
      id,
      title, description, code, price, status, stock, category, thumbnails
    }

    //agrega lo nuevo al archivo
    productos.push(nuevoProducto)
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    return nuevoProducto
  }

  async updateProduct(pid, title, description, code, price, status, stock, category, thumbnails) {

    //trae los productos existentes
    let productos = await this.getProducts()
    
    //encuentra el que se quiere modificar y sustituye los datos
    let productosModificados = productos.map(p => {
      if (p.id == pid) {
        return {
          ...p,
          title: title || p.title,
          description: description || p.description,
          code: code || p.code,
          price: price || p.price,
          status: status || p.status,
          stock: stock || p.stock,
          category: category || p.category,
          thumbnails: thumbnails || p.thumbnails,
        }
      }
      return p;
    })

    //guarda los productos incluyendo el producto modificado
    await fs.promises.writeFile(this.path, JSON.stringify(productosModificados, null, "\t"))
  }

  async deleteProduct(pid) {

    //trae los productos existentes
    let productos = await this.getProducts()

    //encuentra el index del producto a eliminar
    let productoEliminado = await this.getProductById(pid)
    let posicion = productos.indexOf(productoEliminado)

    //elimina el producto
    productos.splice((posicion-1),1)

    //guarda los prodoctos restantes
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
    

  } 

}

module.exports={ProductsManager}
