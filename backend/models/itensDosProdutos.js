const Sequelize = require('sequelize')
const db = require('./db')
const produtosPedidos = require('./produtosPedidos')

const ItensDosProdutos = db.define('itensDosProdutos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeItem:{
        type: Sequelize.STRING,
        allowNull: false
    },
    qntEstoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
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
//ItensDosProdutos.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
//  ItensDosProdutos.sync({ alter: true })

module.exports = ItensDosProdutos;