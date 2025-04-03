const mongoose = require ("mongoose")
const config = require("./config/config")

const ConnectDB = async () =>{
  try{
      await mongoose.connect(config.MONGO_URL)
      console.log("Conectado a base de datos MongoDB")
  }
      catch(error){
          console.error(`Error al conectar a base de datos ${error.message}`)
          process.exit(1);
  }
}

module.exports = ConnectDB