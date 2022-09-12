
const Clientes = require('..//models/clientes')
const ProdutosPedidos = require('..//models/produtosPedidos')
const Pedidos = require('../models/pedidos')

class ConsultaPedidosSolicitados {
    

    async ConsultaTodosOsPedidosSolicitados(req, res, next) {
        const ListaDePedidosSolicitados = await ProdutosPedidos.findAll()
        // console.log(ListaDePedidosSolicitados)
        return res.status(200).json(ListaDePedidosSolicitados)
    }

    async ConsultaPedidosSolicitadosPeloCliente(req, res, next) {
        console.log("req.body")
        // const capturaID = req.params.idDoCliente
        const ListaDePedidosFeitos = await Pedidos.findAll({
            where: {
                IdCliente: req.params.idDoCliente
            }
        })

        // if(ListaDePedidosFeitos.length >= 1){
            
        // }

        for(let i = 0; i < ListaDePedidosFeitos.length; i++){
            console.log(ListaDePedidosFeitos[i].id)
            const ListaDeProdutosDoPedidoFeito = await ProdutosPedidos.findAll({
                where: {
                    IdPedidos: ListaDePedidosFeitos[i].id
                }
            })
            // console.log(ListaDeProdutosDoPedidoFeito[0].titulo)
            
            ListaDePedidosFeitos[i] = {...ListaDePedidosFeitos[i], primeiroProduto: ListaDeProdutosDoPedidoFeito[0].titulo, qntDoProduto: ListaDeProdutosDoPedidoFeito[0].quantidade}
            
        }
        // console.log(ListaDePedidosSolicitados)
        console.log("&&&&&&&&&&&&&&&&&+++++++++++++s")
        console.log(ListaDePedidosFeitos)
        return res.status(200).json(ListaDePedidosFeitos)
    }

    async ConsultaProdutosDosPedidosSolicitadosPeloCliente(req, res, next) {
        // // let armazenaProdutosDosPedidos = []
        // console.log(req.params)
        // // const capturaID = req.params.idDoCliente
        // const ListaDeProdutosDoPedidoFeito = await ProdutosPedidos.findAll({
        //     where: {
        //         IdPedidos: req.params.idDoPedido
        //     }
        // })
        // // console.log(ListaDePedidosSolicitados)
        // console.log("&&&&&&&&&&&&&&&&&")
        // console.log(ListaDeProdutosDoPedidoFeito[0])
        // return res.status(200).json(ListaDeProdutosDoPedidoFeito[0])
    }

    async verDetalhesDoPedidoFeitoPeloCliente(req, res, next) {

        const dadosDoPedido = await Pedidos.findAll({
            where: {
                id: Number(req.params.numPedido)
            }
        })

        
        const ListaDeProdutosDoPedidoFeito = await ProdutosPedidos.findAll({
            where: {
                IdPedidos: Number(req.params.numPedido)
            }
        })

        console.log(dadosDoPedido)

         return res.status(200).json({ dadosDoPedido: dadosDoPedido, ListaDosProdutos: ListaDeProdutosDoPedidoFeito})
        
        

        // console.log(ListaDeProdutosDoPedidoFeito)
    }

    

}

module.exports =  new ConsultaPedidosSolicitados();
