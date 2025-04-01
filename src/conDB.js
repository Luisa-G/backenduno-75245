const mongoose = require ("mongoose")

// export const conectarDB=async(uriMongoDB, dbName)=>{
//     try {
//         await mongoose.connect(
//             uriMongoDB,
//             {
//                 dbName: dbName
//             }
//         )
//         console.log("Conectado a base de datos")
//     } catch (error) {
//         console.log(`Error al conectar a base de datos ${error.message}`)
//     }
// }

const ConnectDB = async () =>{
  try{
      await mongoose.connect("mongodb+srv://luisagonzalezpico:QmzlRnmK4aAY83ZW@cluster0.jr4n8j8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      console.log("Conectado a base de datos MongoDB")
  }
      catch(error){
          console.error(`Error al conectar a base de datos ${error.message}`)
          process.exit(1);
  }
}

module.exports = ConnectDB