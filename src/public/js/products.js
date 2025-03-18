const socket=io()

socket.on("newProduct", ()=>{
  window.location.reload()
})