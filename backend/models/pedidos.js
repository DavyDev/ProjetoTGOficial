const Sequelize = require('sequelize')
const db = require('./db')
const Clientes = require('./clientes')

const Pedidos = db.define('Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    preco: {
        type: Sequelize.INTEGER
        ,
        allowNull: false
    },
    pertenceColumn: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeClienteFezPedido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qntItems: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

    
});

Clientes.hasMany(Pedidos, {
    foreignKey: "IdCliente"
})

/*PedidosUser.belongsTo(Clientes, {
    constraint: true,
    foreignKey: 'IdCliente'
})

Clientes.hasMany(PedidosUser, {
    foreignKey: 'IdCliente'
})*/

//Criar a tabelano bando de dados
//Pedidos.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
//Pedidos.sync({ alter: true })
//
module.exports = Pedidos;