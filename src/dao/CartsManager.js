const fs = require("fs")

class CartsManager{

  constructor(){
    this.path="./src/data/carts.json"
  }

  async getCarts() {
    if(fs.existsSync(this.path)){
      return JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
    }else{
      return []
    }
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

  async addProductToCart(cid, pid) { 
    // Leer todos los carritos
    let carritos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    
    // Buscar el carrito por ID
    let carritoIndex = carritos.findIndex(c => c.id == cid);
    if (carritoIndex === -1) {
        throw new Error(`No se encontró un carrito con ID ${cid}`);
    }

    let carritoElegido = carritos[carritoIndex];
    console.log("Carrito elegido:", carritoElegido);

    // Asegurar que `products` es un array
    let productosEnCarrito = Array.isArray(carritoElegido.products) 
        ? carritoElegido.products 
        : JSON.parse(carritoElegido.products);

    console.log("Productos en carrito antes de agregar:", productosEnCarrito);

    // Buscar si el producto ya está en el carrito
    let productoElegido = productosEnCarrito.find(p => p.product === pid);

    if (!productoElegido) {
        productosEnCarrito.push({
            product: pid,
            quantity: 1
        });
    } else {
        productoElegido.quantity += 1;
    }

    // Actualizar el carrito en el array general
    carritos[carritoIndex].products = productosEnCarrito;

    // Guardar todos los carritos nuevamente en el archivo
    await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2));

    console.log("Carrito actualizado:", carritos[carritoIndex]);
}





  // async addProductToCart(cid,pid) {
  //   let carritoElegido=await this.getCartById(cid)
  //   console.log(carritoElegido)

  //   let productosEnCarrito = JSON.parse(carritoElegido.products)
  //   console.log(productosEnCarrito)

  //   let productoElegido=await this.productosEnCarrito.find (p => p.id == pid)
  //   console.log(productoElegido)

  //   if (!productoElegido){
  //     productosEnCarrito.push({
  //       product: pid,
  //       quantity: 1
  //     })
  //   } else {
  //     productoElegido.quantity += 1
  //   }

  //   // console.log(req.params.cartId);
  //   console.log(cart);

  //   carritoElegido.products=productosEnCarrito

  //   await fs.promises.writeFile(this.path, JSON.stringify(carritoElegido, null, "\t"))

  // }








}




module.exports = CartsManager

// const app = async()=>{
//   const cartsManager = new CartsManager("./src/data/carts.json")

//   try {
//     console.log(await cartsManager.getCartById(2))
//   } catch (error) {
//     console.log(error.message)
//   }
  
  

// }

// app()