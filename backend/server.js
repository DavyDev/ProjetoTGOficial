const app = require('./config/configApplication')
const port = 3002 //Porta que o servidor estará escultando
const bodyParser = require("body-parser")
const express = require('express')
const urlencodedParser = bodyParser.urlencoded({ extended: false })



const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())


const pedidosRouter = require("./src/routes/pedidosRouter")

//const express = require('express')
//const cors = require('cors')



// app.use(express.json())

//Aqui é feito a verificação do CORS
/*app.use((req, res, next) => {
    console.log("Passou pelo CORS e fez a conexão entre os servidores")




    app.use(cors())



    next()
})*/

/*app.use((req, res, next) => {
    console.log("Passou pelo CORS e fez a conexão entre os servidores")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    app.use(cors())
    app.use(cors())

    next()
})*/


// console.log("Passou pelo CORS e fez a conexão entre os servidores")

app.use('/', pedidosRouter)





//app.get('/produtos', (req, res, next) => {
//    res.send(dadosFornecidos()); 
//})


app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})