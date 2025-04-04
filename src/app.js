const express=require("express")
const {Server} = require("socket.io")
const {engine} = require("express-handlebars")
const routerProducts = require("./routes/productsRouter.js")
const routerCarts = require("./routes/cartsRouter.js")
const routerViews = require("./routes/viewsRouter.js")

const ConnectDB = require ("./conDB")
const config = require("./config/config.js")

let io = undefined

const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

ConnectDB();

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use(
  "/api/products",
  (req, res, next)=>{
    req.io=io
    next()
  },
  routerProducts
)
app.use(
  "/api/carts",
  (req, res, next)=>{
    req.io=io
    next()
  },
  routerCarts
)
app.use("/", routerViews)

app.get("/",(req, res)=>{
  res.setHeader("Content-Type","text/plain");
  res.status(200).send("Inicio");
})


const serverHttp = app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})

io = new Server(serverHttp)

