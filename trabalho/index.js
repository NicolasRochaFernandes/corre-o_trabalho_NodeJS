const banco = require("./banco"); // Importa o módulo 'banco', que lida com a configuração e a conexão com o banco de dados.
const express = require('express'); // Importa o framework Express, que simplifica a criação e gerenciamento de servidores web em Node.js.
const dono = require("./dono"); // Importa o módulo 'dono', que contém a definição do modelo e funções relacionadas ao 'dono'.
const carro = require("./carro"); // Importa o módulo 'carro', que contém a definição do modelo e funções relacionadas ao 'carro'.
const { where } = require("sequelize"); // Importa o método 'where' do Sequelize para realizar consultas específicas no banco de dados.



const app = express(); // Cria uma instância da aplicação Express.
app.use(express.json()); // Configura o middleware para processar requisições com corpo em formato JSON.

banco.conexao.sync(function() { // Sincroniza o modelo com o banco de dados, garantindo que a estrutura da tabela esteja atualizada.
    console.log("Banco de dados conectado."); // Exibe uma mensagem no console para confirmar que a conexão com o banco de dados foi estabelecida.
});

// Define cabeçalhos de resposta para permitir requisições de qualquer origem e especificar métodos e cabeçalhos permitidos.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite requisições de qualquer origem.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permite os métodos HTTP especificados.
    res.setHeader('Access-Control-Allow-Headers', '*'); // Permite todos os cabeçalhos na requisição.
    next(); // Passa o controle para o próximo middleware.
});

// Define a porta em que o servidor irá escutar e inicia o servidor. Exibe uma mensagem de confirmação com o número da porta.
const PORTA = 3000; 
app.listen(PORTA, function() {
  console.log("Servidor iniciado na porta " + PORTA); // Mensagem para confirmar que o servidor está rodando na porta especificada.
});


// Cria um novo registro da entidade 'dono'.
app.post("/dono/", async function(req, res) {
    const resultado = await dono.dono.create({ 
        nome: req.body.nome
    });
    res.send(resultado);
});

// Busca todos os registros de 'dono' e retorna a lista.
app.get("/dono/", async function(req, res) {  
    const resultado = await dono.dono.findAll();
    res.send(resultado);
});

// Atualiza os dados de um 'dono' com base no ID fornecido na URL e nos dados do corpo da requisição.
// Retorna o 'dono' atualizado após a atualização.
app.put("/dono/:id", async function(req, res) {
    const resultado = await dono.dono.update({ // Atualiza os dados do 'dono'.
        nome: req.body.nome
    }, {
        where: { id: req.params.id }
    });

    if (resultado[0] === 0) { // Checa se nenhum registro foi atualizado.
        res.status(404).send({});
    } else {
        res.send(await dono.dono.findByPk(req.params.id)); // Retorna o 'dono' atualizado.
    }
});

// Exclui um 'dono' com base no ID fornecido na URL.
// Retorna status 204 se excluído com sucesso, ou status 404 se não encontrado.
app.delete("/dono/:id", async function(req, res) {
    const resultado = await dono.dono.destroy({ // Remove o 'dono' do banco de dados.
        where: { id: req.params.id }
    });

    if (resultado === 0) { // Checa se nenhum registro foi excluído.
        res.status(404).send({});
    } else {
        res.status(204).send({}); // Retorna status 204 para exclusão bem-sucedida.
    }
});

// Busca um 'dono' pelo ID e inclui seus carros relacionados.
app.get("/dono/:id", async function(req, res) {
    const dono_s = await dono.dono.findByPk(req.params.id, { // Encontra o 'dono' pela chave primária.
        include: { model: carro.carro } // Inclui os carros associados ao 'dono'.
    });

    if (dono_s === null) { // Checa se o 'dono' foi encontrado.
        res.status(404).send({});
    } else {
        res.send(dono_s); // Retorna o 'dono' com seus carros.
    }
});

// Busca todos os 'donos' pelo nome fornecido e inclui seus carros relacionados.
app.get("/dono/nome/:nome", async function(req, res) {
    const dono_s = await dono.dono.findAll({
        include: { model: carro.carro }, // Inclui os carros associados ao 'dono'.
        where: { nome: req.params.nome } // Filtra pelo nome fornecido.
    });

    if (dono_s.length === 0) { // Checa se algum 'dono' foi encontrado.
        res.status(404).send({});
    } else {
        res.send(dono_s); // Retorna a lista de donos encontrados.
    }
});

// Cria um novo registro de 'carro' com base nos dados fornecidos e associa a um 'dono'.
app.post("/carro/", async function(req, res) {
    const carro_Novo = await carro.carro.create({
        nome: req.body.nome,
        placa: req.body.placa,
        donoId: req.body.donoId
    });
    res.send(carro_Novo);
});

// Busca todos os registros de 'carro' e retorna a lista.
app.get("/carro/", async function(req, res) {
    const resultado = await carro.carro.findAll(); // Busca todos os carros.
    res.send(resultado);
});

// Busca um 'carro' pelo ID e inclui o 'dono' associado.
app.get("/carro/:id", async function(req, res) {
    const carro_resultado = await carro.carro.findByPk(req.params.id, {
        include: { model: dono.dono } // Inclui o dono associado ao carro.
    });

    if (carro_resultado === null) { // Checa se o 'carro' foi encontrado.
        res.status(404).send({});
    } else {
        res.send(carro_resultado); // Retorna o carro encontrado com seu dono.
    }
});

// Busca todos os carros pelo nome fornecido e inclui os donos relacionados.
app.get("/carro/nome/:nome", async function(req, res) {
    const carro_Escolido = await carro.carro.findAll({
        include: { model: dono.dono }, // Inclui o dono associado ao carro.
        where: { nome: req.params.nome } // Filtra pelo nome fornecido.
    });

    if (carro_Escolido.length === 0) { // Checa se algum carro foi encontrado.
        res.status(404).send({});
    } else {
        res.send(carro_Escolido); // Retorna a lista de carros encontrados.
    }
});

// Atualiza um 'carro' existente com base no ID fornecido e nos dados do corpo da requisição.
// Retorna o 'carro' atualizado após a atualização.
app.put("/carro/:id", async function(req, res) {
    const resultado = await carro.carro.update({
        nome: req.body.nome,
        placa: req.body.placa,
        donoId: req.body.donoId
    }, {
        where: { id: req.params.id }
    });

    if (resultado[0] === 0) { // Checa se nenhum registro foi atualizado.
        res.status(404).send({});
    } else {
        res.send(await carro.carro.findByPk(req.params.id)); // Retorna o carro atualizado.
    }
});

// Exclui um 'carro' com base no ID fornecido.
// Retorna status 204 se excluído com sucesso, ou status 404 se não encontrado.
app.delete("/carro/:id", async function(req, res) {
    const resultado = await carro.carro.destroy({
        where: { id: req.params.id }
    });

    if (resultado === 0) { // Checa se nenhum registro foi excluído.
        res.status(404).send({});
    } else {
        res.status(204).send({}); // Retorna status 204 para exclusão bem-sucedida.
    }
});
