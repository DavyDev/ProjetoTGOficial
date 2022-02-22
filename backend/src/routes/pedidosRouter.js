const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({ extended: false })


const ProdutosController = require("../../controllers/ProdutosControllers")
const ClientesESeusPedidosController = require('../../controllers/ClienteESeusPedidosControllers')
const ConsultaPedidosSolicitados = require('../../controllers/ConsultaPedidosSolicitadosController')
const TesteLoginUser = require('../../controllers/SessionControllerLogin')
//const CadastrarProdutos = require('../../models/CadastrarProdutos')
//Linha que irá pegar e fornecer os dados de cada pedido 
const dadosFornecidos = require('../../data/pedidos')

//EXEMPLO: Aqui passa por uma (Middleware) Exemplo
const middlewareA = require('../../middlewares/middewareA')
const { response } = require('../../config/configApplication')
const { urlencoded } = require('body-parser')



router.get('/produtos/', ProdutosController.ListProdutos)

router.get('/pedidosSolicitados', ConsultaPedidosSolicitados.ConsultaTodosOsPedidosSolicitados)

//Este da um get somente dos que pertencem ao parametro parametro
router.get('/produtos/:cardapio', ProdutosController.ListProdutos)


router.get('/pedidosFeitos/cliente/:codigoCliente', ClientesESeusPedidosController.NomeClienteDoPedido)
router.post('/pedidosFeitos/cliente/:emailCliente/:passwordCliente/:titulo/:descricao/:preco/:quantidade', ClientesESeusPedidosController.CadastrandoPedidoECliente)
router.post('/login', urlencodedParser, TesteLoginUser.ValidTheUser)
//router.post('/login', urlencodedParser, TesteLoginUser.CreateUser)
// router.get('/login', LoginWithToken.ListToken)
//router.post('/login/create', LoginWithToken.CreateUser)
router.get('/pedidosFeitos/cliente/anonimousCliente/:codClienteAnonimo', ClientesESeusPedidosController.VerificandoClienteAnonimo)
router.put('/pedidosFeitos/cliente/:id/:titulo/:descricao/:imagem/:preco/:quantidade/:pertenceColumn', urlencodedParser, ClientesESeusPedidosController.MudandoEstagioPedido)
//router.post('/teste/:nomeCliente/:titulo/:descricao/:preco/:quantide', ClientesESeusPedidosController.JuntandoPedidosaoCliente)

            /*id: 6,
            titulo: "HatunaMatata",
            descricao: "Batatinha frita 123",
            imagem: "URL1",
            preco: 0,
            quantidade: 0,
            cardapio: "tapiocacrepioca",
            IdCliente: novoCliente.id*/

//router.get('/produtos/:id', ProdutosController.ListProdutos)
/*router.get('/produtos', (req, res, next) => {
    console.log("Dando a resposta")
    res.send("Bem vindo: " + req.query.titulo + " idade: " + req.query.preco)
} )*/


router.post('/produtos', urlencodedParser, ProdutosController.CreateProduto)

router.put('/produtos/:id', urlencodedParser, ProdutosController.UpdateProdutos)
router.delete('/produtos/:id', urlencodedParser, ProdutosController.DeleteProdutos)



module.exports = router
