
const mongoose = require("mongoose")
const { Router } = require("express");
// const ProductsManager = require ("../dao/ProductsManager.js")

const ProductsManagerMongo = require("../dao/ProductsManagerMongo.js")
const ProductsManager = ProductsManagerMongo

const router = Router()
// const productManager = new ProductsManager("../src/data/products.json"); 

router.get("/", async(req, res)=>{
  try {

    let productos = await ProductsManager.get();

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

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    let producto = await ProductsManager.getBy({_id: pid})

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

    //validar que se tengan las propiedades requeridas
    if(
      title === undefined || 
      stock === undefined || 
      price === undefined || 
      description === undefined || 
      category === undefined || 
      code === undefined || 
      thumbnails === undefined || 
      status === undefined
    ){
      res.setHeader('Content-Type','application/json');
      return res.status(400).json({error:`title, stock, price, description, category,  code, thumbnails y status son requeridos`})
  }

    //validar si ya existe
    const existingCode = await ProductsManager.getBy({code})
    if(existingCode){
      return res.status(400).json({ error: "code ya existente" });
    }

    let newProduct = await ProductsManager.save({title, description, code, price, status, stock, category, thumbnails})

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
    await ProductsManager.update(pid,{title, description, code, price, status, stock, category, thumbnails})


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
    await ProductsManager.delete(pid)

    res.setHeader("Content-Type","application/json");
    res.status(200).json({payload:"producto eliminado correctamente"});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

module.exports = router