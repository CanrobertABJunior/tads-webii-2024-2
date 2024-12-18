const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const authenticate = function (req, res, next) 
{
    const token = req.query.token;
      
    if (token === '4bCd3') 
    {
        next();
    } 
    else 
    {
        res.status(401).send('Token inválido');
    }
};

const validaProduto = function (req, res, next)
{
    const { nome, preco, categoria } = req.query;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ error: 'Os parâmetros nome, preco e categoria são obrigatórios.' });
    }

    if (isNaN(preco)) {
        return res.status(400).json({ error: 'O parâmetro preco deve ser um número.' });
    }

    next();
};

const produtos = [
    { id: 1, nome: 'Notebook', categoria: 'eletronicos', preco: 3000 },
    { id: 2, nome: 'Celular', categoria: 'eletronicos', preco: 1500 },
    { id: 3, nome: 'Tablet', categoria: 'eletrônicos', preco: 800 },
    { id: 4, nome: 'Camiseta', categoria: 'vestuario', preco: 30 },
    { id: 5, nome: 'Tênis', categoria: 'vestuario', preco: 80 },
    { id: 6, nome: 'Casaco', categoria: 'vestuario', preco: 100 },
];


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Olá, ${name}!`);
});

app.get('/autenticada', authenticate, (req, res) => {
    res.send('Token correto! Acesso autorizado!')
})

app.get('/produtos', (req, res) => {

    const { categoria, precoMinimo } = req.query;
    
    let produtosFiltrados = produtos;

    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria === categoria);
    }

    if (precoMinimo) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.preco >= parseFloat(precoMinimo));
    }

    res.json(produtosFiltrados);
});

app.post('/produtos', validaProduto, (req, res) => {
    const { nome, preco, categoria } = req.query;

    let novoId;

    if (produtos.length > 0) {
        novoId = produtos[produtos.length - 1].id + 1;
    } else {
        novoId = 1;
    }

    const produtoComId = { id: novoId, nome, preco, categoria };

    produtos.push(produtoComId);

    res.status(201).json(produtoComId);
});

// Rota com erro para teste do middleware de erro
app.get('/erro', (req, res) => {
    throw new Error('Este é um erro forçado!'); // Gera um erro
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: {
            message: err.message || 'Algo deu errado!',
            status: 500
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})