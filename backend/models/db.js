const Sequelize = require('sequelize');

const sequelize = new Sequelize('deckcafe', 'root', '123456', {
    host: 'localhost',
    dialect:'mysql'
  });

  sequelize.authenticate()
    .then(() => {
      console.log("Sucesso: Conexão com o bando de dados FOI realizada com sucesso")
    })
    .catch(() => {
      console.log("Erro: Conexão com o bando de dados NÂO foi realizada com sucesso")
    })

module.exports = sequelize