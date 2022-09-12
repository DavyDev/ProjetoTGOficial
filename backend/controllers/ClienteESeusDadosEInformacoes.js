
const Clientes = require('../models/Clientes')


class ClienteESeusDadosEInformacoes {

    async Atualizandodados_NomeCelular(req, res, next) {
        

        const ClienteJaComNomeCelularAtualizados = {
            // id: 383,
            nomeUsuario: req.body.nomeEscolhidoDoUser,      
            celularUsuario: req.body.celularEscolhidoDoUser,    
            // email: clienteQueEstaraAtualizandoNomeCelular.email,       
            // password: clienteQueEstaraAtualizandoNomeCelular.password,       
            // token: clienteQueEstaraAtualizandoNomeCelular.token
        }

        const finalizandoAtualizaçãodoNomeCelular = await Clientes.update(ClienteJaComNomeCelularAtualizados, {
            where: {
                id: req.body.idDoUsuário
            }
        });

        const clienteQueEstaraAtualizandoNomeCelular = await Clientes.findByPk(req.body.idDoUsuário)
        

        res.send({
            celularUsuario: clienteQueEstaraAtualizandoNomeCelular.celularUsuario,
            email: clienteQueEstaraAtualizandoNomeCelular.email,
            id: clienteQueEstaraAtualizandoNomeCelular.id,
            nomeUsuario: clienteQueEstaraAtualizandoNomeCelular.nomeUsuario,
            token: clienteQueEstaraAtualizandoNomeCelular.token,
        })
        console.log(clienteQueEstaraAtualizandoNomeCelular)
        console.log('finalizandoAtualizaçãodoNomeCelular')
    }

   

}

module.exports =  new ClienteESeusDadosEInformacoes();
