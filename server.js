const express = require('express')
const estudio = require('./src/routes/estudios.routes')
const titulo = require('./src/routes/titulos.routes')
const db = require('./src/data/database.js')


const app = express()
app.use(express.json())


// conectar db 
db.connect()

// usar as rotas


app.use('/estudios', estudio)
app.use('/titulos', titulo)


app.listen(9090, ()=> console.log(' uhulll nova iguaçu'))
