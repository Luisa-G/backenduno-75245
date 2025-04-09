const mongoose = require("mongoose")
const { Router } = require("express");
// const CartsManager = require ("../dao/CartsManager.js")

const CartsManagerMongo = require ("../dao/CartsManagerMongo")
const CartsManager = CartsManagerMongo

const router = Router()
// const cartManager = new CartsManager("../src/data/carts.json")

router.post("/", async(req, res)=>{
  try {
    
    let {products} = req.body
    let newCart = await CartsManager.save(products)

    res.setHeader("Content-Type","application/json");
    return res.status(201).json({carritoNuevo: newCart});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.put("/:cid", async(req, res)=>{
  try {
    
    let {cid} = req.params

    if(!mongoose.Types.ObjectId.isValid(cid)){
      res.setHeader('Content-Type','application/json');
      return res.status(400).json({error:`Ingrese un id válido de MongoDB`})
    }


    let {products} = req.body
    
    let updatedCart = await CartsManager.update(cid, {products})

    res.setHeader("Content-Type","application/json");
    return res.status(201).json({carritoActualizado: updatedCart});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.get("/:cid", async(req, res)=>{
  try {

    let {cid} = req.params


    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ error: "ID no válido" });
    }


    let cart = await CartsManager.getBy({_id: cid})

    res.setHeader("Content-Type","application/json");
    res.status(200).json({cart})

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

// router.post("/:cid/product/:pid", async(req, res)=>{
//   try {
    
//     let {cid, pid} = req.params
//     await CartsManager.addProductToCart(cid, pid)

//     res.setHeader("Content-Type","application/json");
//     return res.status(201).json("Producto agregado al carrito seleccionado");

//   } catch (error) {
//     res.setHeader("Content-Type","application/json");
//     res.status(404).json({error: error.message});
//   }
// })

module.exports = router