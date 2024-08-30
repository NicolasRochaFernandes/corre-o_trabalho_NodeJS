// const express = require('express')
// const banco = require("./banco")
// const vendedor = require("./vendedor")
// const pneus = require("./pneus")

// const app  = express()
// app.use(express.json())


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     next();
//   });

// banco.conexao.sync( function(){
//     console.log("Banco de dados conectaod.")
// })  

//  const PORTA = 3000
// app.listen( PORTA, function(){
//     console.log("Servidor Iniciados na porta" +PORTA)
// })