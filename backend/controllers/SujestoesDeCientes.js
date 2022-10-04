const sujestaoOuComentario = require('../models/sujestoesComentarios')

class SujestoesDeClientes {

    async CarregaSujestoes(req, res, next) {

        console.log(req.body)
        const carregaMensgemOuComentarioDoCliente = await sujestaoOuComentario.findAll();
        console.log(carregaMensgemOuComentarioDoCliente)
        return res.status(200).json(carregaMensgemOuComentarioDoCliente)
    }

    async RegistraSujestoes(req, res, next) {

        console.log(req.body)
        const resgistraMensgemOuComentarioDoCliente = await sujestaoOuComentario.create({
            sujestaoOuComentario: req.body.mensagemDeixadaPeloCliente
        });
        return res.status(200).json(resgistraMensgemOuComentarioDoCliente)
    }
    

}

module.exports =  new SujestoesDeClientes();
