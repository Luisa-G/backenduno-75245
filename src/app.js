const express = require("express")
const {UsersManager} = require("./dao/ProductsManager.js")

const userManager = new UsersManager("./src/data/usuarios.json")

const PORT = 8080

const app=express()


app.get("/", (req, res)=>{
  console.log(req.url)

  res.send(`Bienvenido`)
})

app.get("/usuarios", async(req, res)=>{

  let {limit}=req.query
  let usuarios = await userManager.getUsers()

  if(limit){
    limit=Number(limit)
    if(isNaN(limit)){
      return res.send("Error: ingrese un limit numérico")
    }

    usuarios = usuarios.slice(0, limit)
  }



  res.send(usuarios)
})



app.listen(PORT, ()=>{
  console.log(`Server online en puerto ${PORT}`)
})