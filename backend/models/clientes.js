const Sequelize = require('sequelize')
const db = require('./db')

const Clientes = db.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
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
//Clientes.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
//Clientes.sync({ alter: true })

module.exports = Clientes;