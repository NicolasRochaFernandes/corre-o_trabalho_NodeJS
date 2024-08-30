const sequelize = require("sequelize"); // Importa o ORM Sequelize, que permite a interação com o banco de dados.
const banco = require("./banco"); // Importa o módulo 'banco', que contém a configuração e a conexão com o banco de dados.
const carro = require("./carro"); // Importa o módulo 'carro', que define o modelo para a tabela de carros.

var dono = banco.conexao.define(  // Cria um modelo chamado 'dono' e define suas respectivas colunas.
    "dono",
    {
        id: {
            type: sequelize.INTEGER.UNSIGNED, // Define a coluna 'id' como chave primária, auto-incrementada e não assinada.
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: sequelize.STRING,  // Define a coluna 'nome' como uma string que não pode ser nula.
            allowNull: false
        },
    },
    { timestamps: false } // Desativa a adição automática de colunas de timestamps (createdAt, updatedAt).
);

dono.hasMany(carro.carro); // Define o relacionamento onde um 'dono' pode ter muitos 'carros' associados a ele.
carro.carro.belongsTo(dono); // Define o relacionamento onde cada 'carro' pertence a um 'dono' (relação muitos-para-um).

module.exports = { dono }; // Exporta o modelo 'dono' para que possa ser usado em outras partes do projeto.
