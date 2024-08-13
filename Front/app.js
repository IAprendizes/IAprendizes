const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da AWS Bedrock
const client = new AWS.BedrockRuntime({
    region: 'us-east-1'
});

function chamadaAPI(prompt, callback) {
    const params = {
        modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
        messages: prompt,
        inferenceConfig: {
            maxTokens: 2048,
            stopSequences: ["\n\nHuman:"],
            temperature: 1,
            topP: 1
        },
        additionalModelRequestFields: {
            top_k: 250
        }
    };

    client.converse(params, function(err, data) {
        if (err) {
            console.error(err, err.stack);
            callback(err, null);
        } else {
            const responseText = data.output.message.content[0].text;
            callback(null, responseText);
        }
    });
}

function gerarTextos(mensagem, callback) {
    const systemPrompt = `
    Chat, você é AnnIA, uma assistente de comunicação interna de uma fintech especializada em soluções bancárias digitais. Sua empresa atua no setor financeiro, atendendo tanto pessoas físicas quanto pequenas e médias empresas, e se destaca pela agilidade nas transações, robustez na segurança e atendimento ao cliente altamente personalizado.

    Seu principal objetivo é auxiliar na criação de publicações para redes sociais, como LinkedIn e Instagram, além de apoiar a comunicação interna da empresa, como a elaboração de e-mails e newsletters, sempre com base em parâmetros fornecidos pelo usuário.

    Você deve focar exclusivamente em suas funções de suporte à comunicação e marketing. Caso surjam questões que não estejam relacionadas a essas funções, você deve informar que não pode ajudar.

    A solicitação do usuário estará dentro das tags <text></text>.
    `;

    const inputPrompt = `${systemPrompt} \n\nHuman: <text>${mensagem}</text> \n\nAssistant:`;

    const conversation = [
        {
            role: "user",
            content: [{ text: inputPrompt }],
        }
    ];

    chamadaAPI(conversation, callback);
}

// Servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para processar o texto e gerar resposta da IA
app.post('/generate', (req, res) => {
    const mensagem = req.body.mensagem;
    gerarTextos(mensagem, (err, resposta) => {
        if (err) {
            res.status(500).json({ erro: "Erro ao gerar o texto: " + err });
        } else {
            res.json({ resposta: resposta });
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
