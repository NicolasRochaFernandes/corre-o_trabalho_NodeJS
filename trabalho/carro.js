const {sequelize, DataTypes} = require("sequelize"); // Importa o ORM Sequelize para interagir com o banco de dados.
const banco = require("./banco"); // Importa o módulo 'banco', que contém a configuração e a conexão com o banco de dados.
const dono = require("./dono"); // Importa o módulo 'carro', que define o modelo para a tabela de carros.

var carro = banco.conexao.define( // Define um modelo para a tabela 'carro' com suas respectivas colunas.
    "carro",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED, // Define a coluna 'id' como chave primária, auto-incrementada e não assinada.
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING, // Define a coluna 'nome' como uma string que não pode ser nula.
            allowNull: false
        },
        placa: {
            type: DataTypes.STRING, // Define a coluna 'placa' como uma string que não pode ser nula.
            allowNull: false
        },
        donoId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'donos', // O nome da tabela no banco de dados
                key: 'id'
            }
        }
    },
    { timestamps: false }  // Desativa a adição automática de colunas de timestamps (createdAt, updatedAt).
);

module.exports = { carro }; // Exporta o modelo 'carro' para que possa ser utilizado em outras partes do projeto.
