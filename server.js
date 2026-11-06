const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(cors());
app.use(express.json());

const arquivoJSON = path.join(__dirname, 'file.json');

// RECEBER DADOS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'comentario.html'));
});
app.post('/receber', (req, res) => {
    let dados = [];

    if (fs.existsSync(arquivoJSON)) {
        dados = JSON.parse(
            fs.readFileSync(arquivoJSON, 'utf8')
        );
    }

    dados.push(req.body);

    fs.writeFileSync(
        arquivoJSON,
        JSON.stringify(dados, null, 2),
        'utf8'
    );

    res.json({ sucesso: true });
});

// ENVIAR DADOS PARA O SITE
app.get('/dados', (req, res) => {
    try {
        if (!fs.existsSync(arquivoJSON)) {
            return res.json([]);
        }

        const dados = JSON.parse(
            fs.readFileSync(arquivoJSON, 'utf8')
        );

        res.json(dados);

    } catch (error) {
        res.status(500).json({
            erro: 'Não foi possível ler o JSON'
        });
    }
});

// INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
