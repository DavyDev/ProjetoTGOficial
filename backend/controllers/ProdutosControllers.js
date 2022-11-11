const CadastrarProdutos = require('../models/CadastrarProdutos')


class ProdutosController {

    async CreateProduto(req, res, next) {
        let trataBody = {
            titulo: req.body.titulo,
            ativo: req.body.ativo,
            imagem: req.body.imagem,
            cardapio:  req.body.cardapio,
            preco: Number(req.body.preco),
            descricao: req.body.itemsEquantidades,
            dadosParaEstoque: JSON.stringify(req.body.itemsEquantidades)
        }
        console.log("belele")
        console.log(req.body)
        console.log("belele")
    
        // console.log(trataBody)

        
        let textoCompleto = ''
        for(let i = 0; i < trataBody.descricao.length; i++){
            //console.log(trataBody.descricao[i].nomeItem)
            

            if(trataBody.descricao.length == 1) {

                textoCompleto = textoCompleto + trataBody.descricao[i].nomeItem + "."
                
            }
            if(trataBody.descricao.length > 1) {

                if(i != trataBody.descricao.length -1){
                    textoCompleto = textoCompleto + (trataBody.descricao[i].qntItem != 1 ? trataBody.descricao[i].qntItem  + " " + trataBody.descricao[i].nomeItem + "," + " " :  trataBody.descricao[i].nomeItem + "," + " ")
                }
                else if(i == trataBody.descricao.length -1){
                    textoCompleto = textoCompleto + (trataBody.descricao[i].qntItem != 1 ? trataBody.descricao[i].qntItem + " " + trataBody.descricao[i].nomeItem + "." : " " + trataBody.descricao[i].nomeItem + ".")
                }
                
            }
            // if(trataBody.quantidade[i].qntItem != 1) {
                
            //     if(i == trataBody.quantidade.length -1){
            //         texto = texto + trataBody.quantidade[i].qntItem + " " + trataBody.quantidade[i].nomeItem + "."
            //     }
            //     else{
            //         texto = texto + trataBody.quantidade[i].qntItem + " " + trataBody.quantidade[i].nomeItem + "," + " "
            //     }
            // }
            
        }
        
        trataBody.descricao = textoCompleto
        trataBody.quantidade = 7
        console.log(trataBody)
    
         await CadastrarProdutos.create(trataBody)
            .then(() => {
                console.log("Heloooo")
                return res.json({
                    erro: false,
                    mensagem: "Usuário foi cadastrado"
                })
            })
            .catch(() => {
                console.log("Byeeeeee")
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
        else if(validaExisteParams == true){
            console.log("Parametro não existe")
            const ListDosProdutos = await CadastrarProdutos.findAll({
                where: {
                  cardapio: cardapio,
                  ativo: 0
                }
              })
            //   console.log(ListDosProdutos)
              return res.status(200).json(ListDosProdutos)
        }


        /*const ListDosProdutos = await CadastrarProdutos.findAll();
        //const ListDosProdutos = await CadastrarProdutos.findByPk(id);
        if(!ListDosProdutos) return res.status(404).json("Não existe produtos para ser Listado");
        return res.status(200).json(ListDosProdutos)*/
    }

    async ListProdutosParaEdicao(req, res, next) {
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
                  cardapio: cardapio,
                }
              })
            //   console.log(ListDosProdutos)
              return res.status(200).json(ListDosProdutos)
        }


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
            cardapio:  req.body.cardapio,
            dadosParaEstoque:  req.body.dadosParaEstoque
        }

        // const { id } = req.params
        
        console.log(req.body)
        // console.log(trataBody)
        
        
        
        // const encontrandoOProd = await CadastrarProdutos.findAll({
        //     where: {
        //         id: id
        //     }
        // })
        // console.log(encontrandoOProd)

        
        await CadastrarProdutos.update(trataBody, {
            where: {
              id: req.body.id
           }
          });
        const produtoAtualizadoConfirmacao = await CadastrarProdutos.findByPk(req.body.id);

        console.log("++++++++++++++++++++++++++++++++")
        console.log(produtoAtualizadoConfirmacao)
        console.log("++++++++++++++++++++++++++++++++")
          
        produtoAtualizadoConfirmacao && res.status(200).json({sucesso: "Produto atualizado", produtoAtualizado: produtoAtualizadoConfirmacao})
        !produtoAtualizadoConfirmacao && res.status(400).json({erro: "Não foi possivel atualizar produto"})

        // return res.json({
        //     id: id,
        //    body: trataBody
        // })
    }

    async UpdateDeCongelamentoProdutos(req, res, next) {
        console.log(req.body)

        const atualizacaoCongelamento = await CadastrarProdutos.update({ativo: req.body.statusCongelamento}, {
            where: {
              id: req.body.idCongelamento
           }
        });
        console.log(atualizacaoCongelamento)
        console.log("---------------------------")
        atualizacaoCongelamento == 1 && res.status(200).json({sucesso: "Produto atualizado"})
        atualizacaoCongelamento != 1 && res.status(400).json({erro: "Não foi possivel atualizar produto"})

        
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
