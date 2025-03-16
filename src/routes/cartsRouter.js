const { Router } = require("express");
const CartsManager = require ("../dao/CartsManager.js")

const router = Router()
const cartManager = new CartsManager("../src/data/carts.json");


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

module.exports = router