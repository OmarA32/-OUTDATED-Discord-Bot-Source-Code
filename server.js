const express = require('express');
const server = express();

server.all("/", (req, res) =>{
  res.send("hola again.")
})


function KeepAlive() {
  server.listen(3000, () =>{
    console.log(`---------server---------`);  
    console.log("server online!")
    console.log(`---------events---------`);
  })
}

module.exports = KeepAlive