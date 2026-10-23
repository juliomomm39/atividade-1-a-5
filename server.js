
const express = require('express');
const app = express();

app.use(express.json());

let tarefas = [
    { id: 1, descricao: 'Estudar JavaScript' },
    { id: 2, descricao: 'Fazer atividade de programação' },
    { id: 3, descricao: 'Aprender Express' }
];

// Listar todas as tarefas
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Consultar uma tarefa pelo ID
app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        });
    }

    res.json(tarefa);
});

// Cadastrar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao } = req.body;

    if (!descricao || typeof descricao !== 'string') {
        return res.status(400).json({
            mensagem: 'Informe uma descrição válida'
        });
    }

    const novaTarefa = {
        id: tarefas.length > 0
            ? Math.max(...tarefas.map(t => t.id)) + 1
            : 1,
        descricao: descricao
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

// Remover uma tarefa pelo ID
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = tarefas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        });
    }

    tarefas.splice(indice, 1);

    res.json({
        mensagem: 'Tarefa removida com sucesso'
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
