const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({ extended: false })


const PedidosControllers = require("../../controllers/PedidosControllers")
const ProdutosController = require("../../controllers/ProdutosControllers")
const ClientesESeusPedidosController = require('../../controllers/ClienteESeusPedidosControllers')
const ConsultaPedidosSolicitados = require('../../controllers/ConsultaPedidosSolicitadosController')
const TesteLoginUser = require('../../controllers/SessionControllerLogin')
const ItensControllers = require('../../controllers/ItensControllers')
const SujestoesDeClientes = require('../../controllers/SujestoesDeCientes')
//const CadastrarProdutos = require('../../models/CadastrarProdutos')
//Linha que irá pegar e fornecer os dados de cada pedido 
const dadosFornecidos = require('../../data/pedidos')

//EXEMPLO: Aqui passa por uma (Middleware) Exemplo
const middlewareA = require('../../middlewares/middewareA')
const { response } = require('../../config/configApplication')
const { urlencoded } = require('body-parser')
const ClienteESeusDadosEInformacoes = require('../../controllers/ClienteESeusDadosEInformacoes')



router.get('/produtos/', ProdutosController.ListProdutos)
router.post('/produtos', urlencodedParser, ProdutosController.CreateProduto)
router.put('/produtos/:id', urlencodedParser, ProdutosController.UpdateProdutos)
router.delete('/produtos/:id', urlencodedParser, ProdutosController.DeleteProdutos)


router.get('/pedidosSolicitados', ConsultaPedidosSolicitados.ConsultaTodosOsPedidosSolicitados)

//Este da um get somente dos que pertencem ao parametro parametro
router.get('/produtos/:cardapio', ProdutosController.ListProdutos)


router.get('/pedidosFeitos/cliente/:codigoCliente', ClientesESeusPedidosController.NomeClienteDoPedido)
router.post('/pedidosFeitos/cliente/:emailCliente/:passwordCliente/:titulo/:descricao/:preco/:quantidade', ClientesESeusPedidosController.CadastrandoPedidoECliente)

// Esta rota é responsavelpor permitir o acesso de usuários (Tela login)
router.post('/login', urlencodedParser, TesteLoginUser.ValidTheUser)
// Esta rota é responsavelpor criar a conta de usuários para login (Tela register (criação de conta))
router.post('/registerNewAcount', urlencodedParser, TesteLoginUser.CreateUser)


// router.get('/login', LoginWithToken.ListToken)
//router.post('/login/create', LoginWithToken.CreateUser)
router.get('/pedidosFeitos/cliente/anonimousCliente/:codClienteAnonimo', ClientesESeusPedidosController.VerificandoClienteAnonimo)
router.put('/pedidosFeitos/cliente', urlencodedParser, ClientesESeusPedidosController.MudandoEstagioPedido)
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




//--------------------------------------------------------------------------------------

router.get('/listaPedidosFeitos/cliente', PedidosControllers.ListaTodosPedidos)
router.post('/listaProdutosDoPedido/cliente', PedidosControllers.ListaProdutosDoPedido)

//0 - O cliente esta logado, portanto ja existe no banco, bastando informar na criação do pedido o seu IdCliente que sera a chave estrangeira dentro do pedido

//1 - O cliente fez o pedido (Só que pedido não existe no banco antes de ser criado) então é feitoa criação dele
router.post('/pedidosFeitos2/cliente', PedidosControllers.RegistraPedidos)

//2 - Os produtos são cadastrados e ligados ao cliente Pedi(1)<-->Prod(n)
router.post('/produtosNosPedidos/cliente', PedidosControllers.RegistraProdutosDosPedidos)

//-Itens dos Produtos-------------------------------------------------------------------------------------

router.get('/listaItensDosProdutos', urlencodedParser, ItensControllers.ListaItens)
router.post('/registraItensDosProdutos', urlencodedParser, ItensControllers.RegistraItens)

    //-Itens do estoque-------------------------------------------------------------------------------------

        //Quando o clinte acessa a area de estoque deve ser listado os itens atuais em estoque (igual a linha 87) 
        router.get('/listaItensDoEstoque', urlencodedParser, ItensControllers.ListaItens)
        
        //Quando o clinte acessa a area de estoque e realiza uma atualização na quantidade em estoque 
        router.put('/atualizaItensDoEstoque', urlencodedParser, ItensControllers.AtualizaQuantidadeDoItem)

        //Quando o clinte acessa a area de estoque e realiza a exclusão de um item no estoque 
        router.delete('/excluiItensDoEstoque/:id', urlencodedParser, ItensControllers.ExcluiQuantidadeDoItem)


//-Parte relacionada a "Pedidos" e "Meus Dados" quando o cliente esta logado-------------------------------------------------------------------------------------

    //Quando o clinte acessa a area de pedidos dele   
    router.get('/listagemDosMeusPedidosFeitos/:idDoCliente', ConsultaPedidosSolicitados.ConsultaPedidosSolicitadosPeloCliente)

        // * Quando o clinte acessa a area de pedidos dele e precisamos mostrar o primeiro produto de cada pedido dele
        router.get('/listagemDosprodutosDosPedidosFeitos/:idDoPedido', ConsultaPedidosSolicitados.ConsultaProdutosDosPedidosSolicitadosPeloCliente)
        
        // * Quando o clinte acessa a area de pedidos dele e clica em umpedido para vero detalhe das compras
        router.get('/detalhesDoPedido/:numPedido', ConsultaPedidosSolicitados.verDetalhesDoPedidoFeitoPeloCliente)

    //Quando o cliente deseja atualizar as informaçõesdo tipo (Nome e/ou Número)
    router.put('/atualizandoNomeCelularDoUser', urlencodedParser, ClienteESeusDadosEInformacoes.Atualizandodados_NomeCelular)
    
//Aqui é por onde todas as sujestões serão solicitadaspara ser carregadas na tela
router.get('/carregaSujestoesDeClientes', SujestoesDeClientes.CarregaSujestoes)
//Aqui é por onde todas as sujestões serão enviadas e criadas
router.post('/enviaSujestoesDeClientes', SujestoesDeClientes.RegistraSujestoes)



module.exports = router
