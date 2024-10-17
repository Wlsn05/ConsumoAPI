const express = require('express')
const axios = require('axios')
const routes = require('./routes/routes')
const path = require('path')

const app = express()

const PORT = process.env.port || 3000

//EJS como motor de plantillas
app.set('view engine', 'ejs')

//Rutas
app.use(express.json())
app.use('/scripts', express.static(path.join(__dirname, 'scripts')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', routes)

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})