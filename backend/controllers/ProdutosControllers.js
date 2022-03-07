const CadastrarProdutos = require('../models/CadastrarProdutos')


class ProdutosController {

    async CreateProduto(req, res, next) {
        let trataBody = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagem: req.body.imagem,
            preco: Number(req.body.preco),
            quantidade: Number(req.body.quantidade),
            cardapio:  req.body.cardapio
        }
        console.log("belele")
    
        console.log(trataBody)
    
         await CadastrarProdutos.create(trataBody)
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

    async ListProdutos(req, res, next) {
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
        /*else if(validaExisteParams == true){
            console.log("Parametro não existe")
            const ListDosProdutos = await CadastrarProdutos.findAll({
                where: {
                  cardapio: cardapio
                }
              })
              return res.status(200).json(ListDosProdutos)
        }*/


        /*const ListDosProdutos = await CadastrarProdutos.findAll();
        //const ListDosProdutos = await CadastrarProdutos.findByPk(id);
        if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
        return res.status(200).json(ListDosProdutos)*/
    }
    
    async UpdateProdutos(req, res, next) {
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
        });*/
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

        const { id } = req.params
        

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
    //}

}

module.exports =  new ProdutosController();
