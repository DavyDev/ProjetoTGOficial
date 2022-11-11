const Sequelize = require('sequelize')
const db = require('./db')

const CadastrarProdutos = db.define('produtosCadastrados', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    cardapio: {
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.FLOAT
        ,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dadosParaEstoque: {
        type: Sequelize.STRING,
        allowNull: false
    }
    /*cardapio: {
        type: Sequelize.STRING,
        allowNull: false
    }*/
});

//Criar a tabelano bando de dados
//CadastrarProdutos.sync()

//Verifica se háalguma diferença na tabela, e realiza a alteração
// CadastrarProdutos.sync({ alter: true })

module.exports = CadastrarProdutos;