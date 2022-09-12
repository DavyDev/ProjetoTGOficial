
const Clientes = require('..//models/clientes')
const ProdutosPedidos = require('..//models/produtosPedidos')
const Pedidos = require('../models/pedidos')
const itensDosProdutos = require('../models/itensDosProdutos')

class PedidosControllers {

    //1 - O cliente fez o pedido (Só que pedido não existe no banco antes de ser criado) então é feitoa criação dele
    async RegistraPedidos(req, res, next) {
        console.log(req.body)
        //res.json(req.body)

        const pedidoSendoCriado = await Pedidos.create({
            
            IdCliente: req.body.idDoCliente,
            preco: req.body.preco,
            nomeClienteFezPedido: req.body.nomeUsuario,
            pertenceColumn: "fazer",
            qntItems: req.body.qntItems
        })
        console.log("------------^~")
        console.log(pedidoSendoCriado)
        console.log("------------^~")
        res.json({idDoPedido: pedidoSendoCriado.id, idDoCliente: pedidoSendoCriado.IdCliente})
        
        
    
        /*ProdutosPedidos.create({
            titulo: "Titulo Produto",
            descricao: "Descrição Produto",
            imagem: "URL Produto",
            preco: "Preço Produto",
            quantidade: 5,
            emailCliente: "Teste Email Cliente",
            passwordCliente: "Teste Senha",
            pertenceColumn: "fazer",
            IdCliente: 1
        })
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário foi cadastrado",
                    user
                })
            })
            .catch(() => {
                return res.json({
                    erro: true,
                    mensagem: "Usuário não foi cadastrado"
                })
            })
        */
    }

    //2 - Os produtos são cadastrados e ligados ao cliente Pedi(1)<-->Prod(n)
    async RegistraProdutosDosPedidos(req, res, next) {
        console.log("--------")
        console.log(req.body)
        console.log("---***^^^-----")
        
        const novoProduto = await ProdutosPedidos.create({
            titulo: req.body.titulo,  
            descricao: req.body.descricao,  
            imagem: req.body.imagem,  
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            pertenceColumn: "fazer",
            IdPedidos: req.body.IdPedidos,
            comentario: req.body.comentario

        })

        for(let i = 0; i < req.body.dadosParaEstoque.length; i++) {
            console.log("Passou pelo item")
            let encontraProduto = await itensDosProdutos.findOne({
                where: { nomeItem: req.body.dadosParaEstoque[i].nomeItem }
            })

            console.log("Aqui aqui ><")
            console.log(encontraProduto)

            // encontraProduto = false

            if(encontraProduto){
                let dadosDoProdutoEncontrado = {
                    id: encontraProduto.id,
                    nomeItem: encontraProduto.nomeItem,
                    qntEstoque: encontraProduto.qntEstoque
                }

                console.log(dadosDoProdutoEncontrado.qntEstoque)
                // console.log(encontraProduto.qntEstoque)
                if(encontraProduto.qntEstoque != 0){
                    // console.log("Esta maior que 0")
                     let qntSeraTirada = (req.body.quantidade * req.body.dadosParaEstoque[i].qntItem)
                     let totalAtualizaraEstoque = (dadosDoProdutoEncontrado.qntEstoque - qntSeraTirada)
                    // console.log(qntSeraTirada)
                    // console.log(dadosDoProdutoEncontrado)
                    // console.log(totalAtualizaraEstoque)
                    dadosDoProdutoEncontrado = {...dadosDoProdutoEncontrado, qntEstoque: totalAtualizaraEstoque}
                    // console.log("----------")
                    // console.log(dadosDoProdutoEncontrado)
                    // console.log("----------")

                    // await itensDosProdutos.update(dadosDoProdutoEncontrado, {
                    //     where: {
                    //       id: encontraProduto.id
                    //    }
                    //   });
            
                    // return console.log("Deu certo")

                    //Realizar a atualização do estoque aqui
                    console.log("oi------------------------------------------------")
                    console.log(`Quantidade que sera tirada: ${qntSeraTirada}`)
                    console.log(dadosDoProdutoEncontrado)

                    await itensDosProdutos.update(dadosDoProdutoEncontrado, {
                        where: {
                          id: dadosDoProdutoEncontrado.id
                       }
                      });
                }
                else{
                    console.log("Tratar no caso de ser igual a 0")
                }
            }
            else{
                console.log("Tratar o erro por aqui, pois deveria ter encontrado o item")
            }

            
        }

        // console.log("ºººººººººº")
        // console.log(req.body.dadosParaEstoque.length)
        // console.log("ºººººººººº")

        /*const pedidos = await Pedidos.findByPk(23)
        const produtos = await pedidos.getProdutosPedidos()
        */

        // res.json("teste")
    }

    async ListaTodosPedidos(req, res, next) {
        const listaTodosPedidos = await Pedidos.findAll()
        //console.log(json(listaTodosPedidos))
        return res.status(200).json(listaTodosPedidos)
    }

    async ListaProdutosDoPedido(req, res, next) {
        console.log("############")
        console.log(JSON.parse(req.body.numProduto))
        console.log("############")

        const pedidos =  await Pedidos.findByPk(req.body.numProduto)
        const produtos = await pedidos.getProdutosPedidos()
        console.log(pedidos)

        return res.status(200).json(produtos)
    }

    

}

module.exports =  new PedidosControllers();
