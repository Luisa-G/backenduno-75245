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

  async getProductById(id){
    id=Number(id);
    if(isNaN(id)){
      throw new Error("Ingrese un id tipo number")
    }


    //obtiene lo que ya hay en el archivo
    let productos=await this.getProducts()

    //busca en el archivo
    let producto=productos.find(p=>p.id==id)

    if(!producto){
      throw new Error(`No existen productos con el id ${id}`)
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

// async modifyProduct(id) {

// }

// async deleteProduct(id) {

// }


}

module.exports={ProductsManager}


// const app = async()=>{
//   const productsManager = new ProductsManager("./src/data/products.json")
  
//   // console.log(await productsManager.addProduct("BARATO","Bonita pluma de varios colores", "PDD125",40, true, 10, "Plumas", []))
  
//   // console.log(await productsManager.getProducts())

//   try {
//     console.log(await productsManager.getProductById(3));

//   } catch (error) {
//     console.log(error.message);
//   }
  



// }

// app()