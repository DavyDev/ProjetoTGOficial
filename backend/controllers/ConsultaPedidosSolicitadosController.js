
const Clientes = require('..//models/clientes')
const ProdutosPedidos = require('..//models/produtosPedidos')

class ConsultaPedidosSolicitados {

    async ConsultaTodosOsPedidosSolicitados(req, res, next) {
        const ListaDePedidosSolicitados = await ProdutosPedidos.findAll()
        console.log(ListaDePedidosSolicitados)
        return res.status(200).json(ListaDePedidosSolicitados)
    }

    

}

module.exports =  new ConsultaPedidosSolicitados();
