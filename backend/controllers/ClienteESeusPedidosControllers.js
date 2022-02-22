
const Clientes = require('../models/Clientes')
const ProdutosPedidos = require('..//models/produtosPedidos')

class ClientesESeusPedidosController {

    async CadastrandoPedidoDeClientes(req, res, next) {
        let cliente = {
            nome: req.body.nome,
            
        }

        let trataBody = {
            id: req.body.id,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            preco: Number(req.body.preco),
            quantidade: Number(req.body.quantidade),
            cardapio:  req.body.cardapio,
            IdCliente: req.body.id
        }
    
        

        const novoCliente = await Clientes.create({
            nome: req.body.nome
        })

        /*const novoPedido = await Pedidos.create({
            id: 6,
            titulo: "HatunaMatata",
            descricao: "Batatinha frita 123",
            imagem: "URL1",
            preco: 0,
            quantidade: 0,
            cardapio: "tapiocacrepioca",
            IdCliente: novoCliente.id
        })*/

        /*const cliente1 = await Clientes.findByPk(1)
        const pedidos = await cliente1.getPedidos()
        console.log(pedidos)*/

        //RecebePedidosFeitos.create(trataBody)

        return res.json(cliente)
    
         /*await CadastrarProdutos.create(trataBody)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário foi cadastrado"
                })
            })
            .catch(() => {
                return res.json({
                    erro: true,
                    mensagem: "Usuário não foi cadastrado"
                })
            })
    }
        

    /*async ListProdutos(req, res, next) {
        console.log("-------------")
        const { cardapio } = req.params
        const validaExisteParams = Boolean(cardapio)
        console.log(cardapio)
        console.log(Boolean(cardapio))
        console.log("-------------")

        if(validaExisteParams == false ){
            const ListDosProdutos = await CadastrarProdutos.findAll();
            if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
            return res.status(200).json(ListDosProdutos)
        }
        else if(validaExisteParams == true){
            console.log("Parametro não existe")
            const ListDosProdutos = await CadastrarProdutos.findAll({
                where: {
                  cardapio: cardapio
                }
              })
              return res.status(200).json(ListDosProdutos)
        }
        /*const ListDosProdutos = await CadastrarProdutos.findAll();
        //const ListDosProdutos = await CadastrarProdutos.findByPk(id);
        if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
        return res.status(200).json(ListDosProdutos)*/
    }

    async CadastrandoClienteAnonimo(req, res, next) {
        const novoClienteAnonimo = await Clientes.create({
            nome: `Cliente_Anonimo`,
            codigoDeAnonimo: `#${req.params.codigoDeAnonimo}`,
            clienteAnonimo: `${req.params.isAnonimo}`
        })

        res.send("Deu certo o anonimato")
    }

    async VerificandoClienteAnonimo(req, res, next) {
        const encontrouClienteAnonimo = await Clientes.findAll({
            where: {
                codigoDeAnonimo: `#${req.params.codClienteAnonimo}`
            }
        })

        console.log("Teste zezé+++")
        if(encontrouClienteAnonimo.length === 0){
            console.log("False")
            return res.status(200).json(encontrouClienteAnonimo)
        }
        else if(encontrouClienteAnonimo.length === 1){
            console.log("True")
            return res.status(200).json(encontrouClienteAnonimo)
        }

        //console.log(`#${req.params.codClienteanonimo}`)

        
    }

    async CadastrandoPedidoECliente(req, res, next) {
        //console.log(`${req.params.nome}`)
        //console.log(`${req.params.preco}`)
        /*function testeRelacao (){
            console.log(`${req.params}`)
            
          //  console.log("Hello teste")
        */

          console.log(req.params)
       
          const novoCliente = await Clientes.create({
            email: `${req.params.emailCliente}`,
            password: `${req.params.passwordCliente}`,
            token: `teste`

        })
        const cliente = await Clientes.findByPk(novoCliente.id)

        console.log("--------------->")
        console.log(cliente.id)
        console.log("--------------->")
        

        const novoPedido = await ProdutosPedidos.create({
            //id: 119,
            titulo: req.params.titulo,
            descricao: req.params.descricao,
            imagem: "URL2",
            preco: req.params.preco,
            quantidade: (req.params.quantidade),
            emailCliente: req.params.emailCliente,
            passwordCliente: req.params.passwordCliente,
            pertenceColumn: "fazer",
            IdCliente: cliente.id
        })

        console.log("--------------->")
        console.log(novoPedido)
        console.log("--------------->")
        

        /*
        
        

        
        
        
        
        console.log("ops")
        console.log("---------------")
        console.log(req.params)
        console.log("---------------")

        console.log(novoCliente)*/
        
        return res.json("Fala ai bebe")
    }

    async NomeClienteDoPedido(req, res, next) {
        console.log("-------------")
            console.log(req.params.codigoCliente)
        console.log("-------------")

        /*if(validaExisteParams == false ){
            const ListDosProdutos = await CadastrarProdutos.findAll();
            if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
            return res.status(200).json(ListDosProdutos)
        }*/
        //else if(validaExisteParams == true){
        //    console.log("Parametro não existe")
        const ListDosProdutos = await Clientes.findAll({
            where: {
                id: req.params.codigoCliente
            }
        })
        
        return res.status(200).json(ListDosProdutos)
        //}
        
    }
    
    async MudandoEstagioPedido(req, res, next) {
        console.log(req.params)
        let trataBody = {
            id: req.params.id,
            titulo: req.params.titulo,
            descricao: req.params.descricao,
            imagem: req.params.imagem,
            preco: req.params.preco,
            quantidade: req.params.quantidade,
            pertenceColumn: req.params.pertenceColumn
        }

        await ProdutosPedidos.update(trataBody, {
            where: {
              id: trataBody.id
           }
          });

        return res.json({
            id: trataBody.id,
           body: trataBody
        })
    }
    
    /*async JuntandoPedidosaoCliente(req, res, next) {
        
        console.log(req.params.titulo)
        const novoPedido = await Pedidos.create({
            id: 6,
            titulo: "HatunaMatata",
            descricao: "Batatinha frita 123",
            imagem: "URL1",
            preco: 0,
            quantidade: 0,
            cardapio: "tapiocacrepioca",
            IdCliente: "teste"
        })
        return res.json("Fala ai bebezão")
    }*/
    
    
    /*async UpdateProdutos(req, res, next) {
        let trataBody = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            preco: Number(req.body.preco),
            quantidade: Number(req.body.quantidade),
            cardapio:  req.body.cardapio
        }

        const { id } = req.params
        
        console.log(id)
        console.log(trataBody)
        //const id = req.params.id
        //const produto = await CadastrarProdutos.findByPk(id)
        //if(!id) return console.log("Insucesso")
        //if(!produto) return console.log("Insucesso")

        //await produto.update(trataBody)
        //await produto.destroy()

        await CadastrarProdutos.update(trataBody, {
            where: {
              id: id
           }
          });

        return res.json({
            id: id,
           body: trataBody
        })

        

        /*await CadastrarProdutos.update()


          .then(() => {
            return res.json({
                erro: false,
                mensagem: "Testando aqui Rapaz"
            })
        })
        .catch(() => {
            return res.json({
                erro: true,
                mensagem: "Usuário não foi Atualizado"
            })
        });
    }

    async DeleteProdutos(req, res, next) {
        let trataBody = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            preco: Number(req.body.preco),
            quantidade: Number(req.body.quantidade),
            cardapio:  req.body.cardapio
        }
        /*console.log("-------------")
        const { id } = req.params
        const validaExisteParams = Boolean(cardapio)
        console.log(cardapio)
        console.log(Boolean(cardapio))
        console.log("-------------")

        if(validaExisteParams == false ){
            //const ListDosProdutos = await CadastrarProdutos.findAll();
            //if(!ListDosPssrodutos) return res.status(404).json("Não existe produtos para ser Listado");
            return res.send("JNão foi possiveli dentificar o produto que deseja excluir ")
        }
        else if(validaExisteParams == true){
            await User.destroy({
                where: {
                  id: id
                }
              });
              return res.status(200).send("Apagado com sucesso")
        }*/
        /*const ListDosProdutos = await CadastrarProdutos.findAll();
        //const ListDosProdutos = await CadastrarProdutos.findByPk(id);
        if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
        return res.status(200).json(ListDosProdutos)*/

        /*const { id } = req.params
        

        //const produto = await CadastrarProdutos.findByPk(id)
        
        //if(!id) return console.log("Insucesso")
        //if(!produto) return console.log("Insucesso")

        //await produto.update(trataBody)
        await CadastrarProdutos.destroy({
            where: {
              id: id
            }
          })
          const ListDosProdutos = await CadastrarProdutos.findAll()
        res.send(ListDosProdutos)

        
    }
    //async ListProdutos(req, res, next) {
    //    const ListDosProdutos = await CadastrarProdutos.findByPk(req.params.id);
    //    if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
    //    return res.status(200).json(ListDosProdutos)
    //}*/

}

module.exports =  new ClientesESeusPedidosController();
