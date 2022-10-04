const Sequelize = require('sequelize')
const db = require('./db')

const SujestoesEComentarios = db.define('sujestoesOuComentarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sujestaoOuComentario:{
        type: Sequelize.STRING,
        allowNull: false
    }
    /*clienteAnonimo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },*/
    /*cardapio: {
        type: Sequelize.STRING,
        allowNull: false
    }*/
});

//Criar a tabelano bando de dados
// SujestoesEComentarios.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
//  Clientes.sync({ alter: true })

module.exports = SujestoesEComentarios;