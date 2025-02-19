const fs = require("fs")

class CartsManager{
  constructor(rutaArchivo) {
    this.path = rutaArchivo
  }

  async getCartById(id) {
    //si no hay archivo, returna array vacío
    if(!fs.existsSync(this.path)){
      return []
    }

    //valida que el id sea tipo number
    id=Number(id);
    if(isNaN(id)){
      throw new Error("Ingrese un id tipo number")
    }

    //cuando sí hay archivo, hay que obtener lo que ya hay
    let carritos=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))

    //busca en el archivo
    let carrito = carritos.find(c=>c.id==id)

    if(!carrito){
      throw new Error(`No existen carritos con el id ${id}`)
    }

    return carrito
  }
}



module.exports = {CartsManager}

const app = async()=>{
  const cartsManager = new CartsManager("./src/data/carts.json")

  try {
    console.log(await cartsManager.getCartById(2))
  } catch (error) {
    console.log(error.message)
  }
  
  

}

app()