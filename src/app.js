const express=require("express");
const {ProductsManager}=require("./dao/ProductsManager.js");
const {CartsManager}=require("./dao/CartsManager.js");

const productManager=new ProductsManager("./src/data/products.json");
const cartManager=new CartsManager("./src/data/carts.json");

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get("/",(req, res)=>{
  res.setHeader("Content-Type","text/plain");
  res.status(200).send("Inicio");
})

app.get("/api/products", async(req, res)=>{
  try {

    let productos = await productManager.getProducts();

    res.setHeader("Content-Type","application/json");
    res.status(200).json({productos})
  
  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

app.get("/api/products/:pid", async(req, res)=>{
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

app.post("/api/products", async(req, res)=>{
  try {
    
    let {title, description, code, price, status, stock, category, thumbnails} = req.body
    await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails)

    res.setHeader("Content-Type","application/json");
    return res.status(201).json({payload:"producto creado correctamente"});

  } catch (error) {
    res.setHeader("Content-Type","application/json");
    res.status(404).json({error: error.message});
  }
})

app.put("/api/products/:pid", async(req,res)=>{
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

app.delete("/api/products/:pid", async(req,res)=>{
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