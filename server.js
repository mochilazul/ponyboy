
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

const arquivoJSON = path.join(__dirname, 'file.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'comentario.html'));
});

app.post('/receber', (req, res) => {
    try {
        let dados = [];

        if (fs.existsSync(arquivoJSON)) {
            dados = JSON.parse(fs.readFileSync(arquivoJSON, 'utf8'));
        }

        dados.push(req.body);

        fs.writeFileSync(
            arquivoJSON,
            JSON.stringify(dados, null, 2),
            'utf8'
        );

        res.json({ sucesso: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao salvar comentário' });
    }
});

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
        console.error(error);
        res.status(500).json({
            erro: 'Não foi possível ler o JSON'
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
