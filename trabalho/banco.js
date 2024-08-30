const sequelize = require("sequelize"); // Importa o ORM Sequelize para interagir com o banco de dados.
require("dotenv").config();  // Carrega variáveis de ambiente do arquivo .env e as adiciona ao objeto process.

const conexao = new sequelize( // Cria uma instância do Sequelize e configura a conexão com o banco de dados.
    process.env.DB_NAME, // Nome do banco de dados.
    process.env.DB_USER, // Nome do usuário do banco de dados.
    process.env.DB_PASSWORD, // Senha do usuário do banco de dados.
    {
        dialect: "mysql",  // Define o tipo de banco de dados como MySQL.
        host: process.env.DB_HOST // Endereço do servidor do banco de dados.
    }
);

module.exports = { conexao }; // Exporta a conexão para uso em outras partes do projeto.
