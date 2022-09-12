const ProdutosPedidos = require('..//models/produtosPedidos')
const ItensDosProdutos = require('../models/itensDosProdutos')
class ItensControllers {

    async ListaItens(req, res, next) {
        const ListDosItens = await ItensDosProdutos.findAll();
        res.json(ListDosItens)
    }

    
    async RegistraItens(req, res, next) {
        console.log(req.body)

        const ItensSendoCriado = await ItensDosProdutos.create({
            
            nomeItem: req.body.nomeDoItem,
            qntEstoque: req.body.qntEstoqueDoItem
            
        })

        if(ItensSendoCriado){
            res.json({
                mensagem: "Item Registrado com Sucesso",
                ItensSendoCriado
            })
        }
    }

    // async RegistraProdutosDosPedidos(req, res, next) {
        
    // }

    // async ListaTodosPedidos(req, res, next) {
       
    // }

    // async ListaProdutosDoPedido(req, res, next) {
        
    // }

    

}

module.exports =  new ItensControllers();
