const express=require("express");
const routerProducts = require("./routes/productsRouter.js")
const routerCarts = require("./routes/cartsRouter.js")

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)



app.get("/",(req, res)=>{
  res.setHeader("Content-Type","text/plain");
  res.status(200).send("Inicio");
})


app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})