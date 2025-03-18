
const { Router } = require("express");
const ProductsManager = require ("../dao/ProductsManager.js")

const router = Router()
const productManager = new ProductsManager("../src/data/products.json"); 

router.get("/", async(req, res)=>{
  try {

    let productos = await productManager.getProducts();

    res.setHeader("Content-Type","application/json");
    res.status(200).json({productos})
  
  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.get("/:pid", async(req, res)=>{
  try {

    let {pid} = req.params
    let producto = await productManager.getProductById(pid)

    res.setHeader("Content-Type","application/json");
    res.status(200).json({producto: producto});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.post("/", async(req, res)=>{
  try {
    
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    let newProduct = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails)

    req.io.emit("newProduct", newProduct)



    res.setHeader("Content-Type","application/json");
    return res.status(201).json({productoNuevo: newProduct});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.put("/:pid", async(req,res)=>{
  try {

    let{pid} = req.params
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    await productManager.updateProduct(pid,title, description, code, price, status, stock, category, thumbnails)


    res.setHeader("Content-Type","application/json");
    return res.status(201).json({payload:"producto modificado correctamente"});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.delete("/:pid", async(req,res)=>{
  try {
    
    let{pid} = req.params
    await productManager.deleteProduct(pid)

    res.setHeader("Content-Type","application/json");
    res.status(200).json({payload:"producto eliminado correctamente"});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})








module.exports = router