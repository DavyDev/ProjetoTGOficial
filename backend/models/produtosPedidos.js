const Sequelize = require('sequelize')
const db = require('./db')
const Clientes = require('./clientes')
const Pedidos = require('./pedidos')

const ProdutosPedidos = db.define('ProdutosPedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.INTEGER
        ,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pertenceColumn: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Este é de teste

Pedidos.hasMany(ProdutosPedidos, {
    foreignKey: "IdPedidos"
})
/*
ProdutosPedidos.belongsTo(Pedidos, {
    constraint: true,
    foreignKey: 'IdPedidos'
})*/

//Oficial abaixo
/*ProdutosPedidos.belongsTo(Pedidos, {
    constraint: true,
    foreignKey: 'IdCliente'
})*/

/*Clientes.hasMany(ProdutosPedidos, {
    foreignKey: 'IdCliente'
})*/

//Criar a tabelano bando de dados
//ProdutosPedidos.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
//ProdutosPedidos.sync({ alter: true })
//
module.exports = ProdutosPedidos;