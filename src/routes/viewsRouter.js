
const { Router } = require("express");
const ProductsManager = require ("../dao/ProductsManager.js")

const router = Router()
const productManager = new ProductsManager("../src/data/products.json"); 

router.get("/products", async(req, res)=>{
  let products=await productManager.getProducts()

  res.render("home", {products})
})

router.get("/realtimeproducts", async(req, res)=>{
  let products=await productManager.getProducts()


  res.render("realTimeProducts", {products})
})

module.exports=router