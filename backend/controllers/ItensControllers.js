const ProdutosPedidos = require('..//models/produtosPedidos')
const ItensDosProdutos = require('../models/itensDosProdutos')
class ItensControllers {

    async ListaItens(req, res, next) {
        const ListDosItens = await ItensDosProdutos.findAll();
        // res.json(ListDosItens)
        res.status(200).json(ListDosItens)
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
    
    async AtualizaQuantidadeDoItem(req, res, next) {
        console.log(req.body)
        
        const itemNoEstoqueAtualizado = await ItensDosProdutos.update({qntEstoque: req.body.qntEstoque}, {
            where: {
                id: req.body.id
            }
        });

        const ListDosItens = await ItensDosProdutos.findAll();


        // res.json(ListDosItens)
        res.status(200).json(ListDosItens)
    }

    async ExcluiQuantidadeDoItem(req, res, next) {
        console.log(req.params)
        
        const itemNoEstoqueDeletado = await ItensDosProdutos.destroy({
            where: {
              id: req.params.id
            }
          });

        const ListDosItens = await ItensDosProdutos.findAll();


        // // res.json(ListDosItens)
        res.status(200).json(ListDosItens)
    }
    // async RegistraProdutosDosPedidos(req, res, next) {
        
    // }

    // async ListaTodosPedidos(req, res, next) {
       
    // }

    // async ListaProdutosDoPedido(req, res, next) {
        
    // }

    

}

module.exports =  new ItensControllers();
