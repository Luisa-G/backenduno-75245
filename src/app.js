const express=require("express");
const routerProducts = require("./routes/productsRouter.js")


const {CartsManager}=require("./dao/CartsManager.js");


const cartManager=new CartsManager("./src/data/carts.json");

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", routerProducts)



app.get("/",(req, res)=>{
  res.setHeader("Content-Type","text/plain");
  res.status(200).send("Inicio");
})









app.get("/api/carts/:cid", async(req, res)=>{
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

app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})