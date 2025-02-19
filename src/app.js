const express=require("express")
const {ProductsManager}=require("./dao/ProductsManager.js")
const {CartsManager}=require("./dao/CartsManager.js")

const productManager=new ProductsManager("./src/data/products.json")
const cartManager=new CartsManager("./src/data/carts.json")

const PORT=8080

const app=express()


app.get("/",(req, res)=>{

  res.send(`Inicio`)
})

app.get("/api/products", async(req, res)=>{

  let productos = await productManager.getProducts()

  res.status(200).send(productos)
})

app.get("/api/products/:id", async(req, res)=>{
  try {
    let {id} = req.params
    let producto = await productManager.getProductById(id)

    res.status(200).send(producto)
  } catch (error) {
    res.status(404).json({error: error.message});
  }

})

app.get("/api/carts/:id", async(req, res)=>{
  try {
    let {id} = req.params
    let cart = await cartManager.getCartById(id)

    res.status(200).send(cart)
  } catch (error) {
    res.status(404).json({error: error.message});
  }

})

app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})