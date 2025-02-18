const express = require("express")
const {ProductsManager} = require("./dao/ProductsManager.js")

const productManager = new ProductsManager("./src/data/products.json")

const PORT = 8080

const app=express()


app.get("/", (req, res)=>{

  res.send(`Inicio`)
})

app.get("/api/products", async(req, res)=>{

  let productos = await productManager.getProducts()

  res.send(productos)
})



app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})