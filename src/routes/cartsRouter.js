const { Router } = require("express");
const CartsManager = require ("../dao/CartsManager.js")

const router = Router()
const cartManager = new CartsManager("../src/data/carts.json")

router.post("/", async(req, res)=>{
  try {
    
    let {products} = req.body
    let newCart = await cartManager.addCart(products)

    res.setHeader("Content-Type","application/json");
    return res.status(201).json({carritoNuevo: newCart});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.get("/:cid", async(req, res)=>{
  try {

    let {cid} = req.params
    let cart = await cartManager.getCartById(cid)

    res.setHeader("Content-Type","application/json");
    res.status(200).json({cart})

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

router.post("/:cid/product/:pid", async(req, res)=>{
  try {
    
    let {cid, pid} = req.params
    await cartManager.addProductToCart(cid, pid)

    res.setHeader("Content-Type","application/json");
    return res.status(201).json("Producto agregado al carrito seleccionado");

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

module.exports = router