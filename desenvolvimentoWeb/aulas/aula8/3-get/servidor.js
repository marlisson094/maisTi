// Importa os módulos essenciais do Node.js
const http = require('http');
const url = require('url'); // Módulo 'url' para analisar a URL da requisição
const fs = require('fs');
const { text } = require('stream/consumers');

// Credenciais fixas para validação
const USUARIO_VALIDO = 'aluno@maisti.ufs.br';
const SENHA_VALIDA = 'secreta';

const servidor = http.createServer((req, res) => {
    // Analisa a URL da requisição para facilitar o acesso aos seus componentes
    //console.log(`Requisição recebida: método-> ${req.method}; URL -> ${req.url}`);

    const reqHeadersJSON = JSON.stringify(req.headers, null, 2);
    //console.log(`Cabeçalho em JSON: ${reqHeadersJSON}`);
    
    //converter a url em um objeto com as informações pathname e query
    const reqUrl = url.parse(req.url, true);
    // 1. Extrai os parâmetros da query string da URL
    const dados = reqUrl.query;
    
    //ex1 --------------------------------------------------------------------------------------------------------------------------------------
    console.log(`\x1b[31m \x1b[1m EXERCÍCIO 1 \x1b[0m`)
    console.log(`\x1b[31m \x1b[1m Data: \x1b[0m ${new Date()}`); //impirmindo data
    console.log(`\x1b[31m \x1b[1m Método: \x1b[0m ${req.method}`); //imprimindo o método http enviado na requisição
    console.log(`\x1b[31m \x1b[1m Rota: \x1b[0m ${reqUrl.pathname}`); //imprimir a rota que fez a requisição

    // ROTA PRINCIPAL: Entrega o formulário de login
    if (req.method === 'GET' && reqUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Erro ao carregar a página de login.");
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }

    //EX2 ----------------------------------------------------------------------------------------------------------------------------------------
    //criar uma nova rota 'saudacoes' e responder 
    else if(req.method === 'GET' && reqUrl.pathname === '/saudacoes'){
        //console.log(`\x1b[31m \x1b[1m UrlJson: ${JSON.stringify(reqUrl)} \x1b[0m`)
        res.writeHead(302,{'content-type' : 'text/html; charset=utf-8'})
        //EX3--------------------------------------------------------------------------------------------------------------------
        //Alterar a cor de forma dinâmica a partir da cor recebida pelo usuário 
        res.end(`<h1 style="color:${dados.cor}">Olá ${dados.nome}</h1>`)
    }

    // Roteamento: Verifica se a requisição é um GET para a rota /login
    else if (req.method === 'GET' && reqUrl.pathname === '/login') {

        // 2. Valida as credenciais
        if (dados.email === USUARIO_VALIDO && dados.senha === SENHA_VALIDA) {
            // SUCESSO: Redireciona para a página bemvindo.html
            console.log('Credenciais válidas. Redirecionando...');
            res.writeHead(302, { 'Location': '/bemvindo' });
            res.end();
        } else {
            // FALHA: Responde com uma mensagem de erro simples
            console.log('Credenciais inválidas.');
            res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>E-mail ou senha inválidos.</h1>');
        }
    } 
    // Roteamento: Se o navegador pedir pela página de boas-vindas (continua igual)
    else if (req.method === 'GET' && req.url === '/bemvindo') {
        fs.readFile('bemvindo.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Pagina não encontrada");
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    // Para qualquer outra requisição, não faz nada
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Pagina não encontrada.');
    }
});

// Define a porta e inicia o servidor
const PORTA = 3000;
servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    console.log('Abra o arquivo index.html em seu navegador para começar.');
});