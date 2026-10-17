const prompt = require('prompt-sync')();
const fs = require('fs')
const DB = require("better-sqlite3")

class Banco{
    constructor(){
        this.db = new DB('escambo.db')
        this.db.pragma('foreign_keys = ON');
    }

    limparTabela(){
        this.db.prepare("DELETE FROM usuario").run()
    }

    criarTabelas(){
        this.limparTabela()
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS usuario(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE,
                senha TEXT NOT NULL
            )    
        `)
        //const resp = this.db.prepare("INSERT INTO usuario(nome,email,senha) VALUES('marlisson','marlisson@gmail.com',123)")
        //resp.run()

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS categoria(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT
            )    
        `)

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS item(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                idCategoria INTEGER NOT NULL,
                idDono INTEGER NOT NULL,
                nome TEXT NOT NULL, 
                descricao TEXT,
                status TEXT NOT NULL, 
                FOREIGN KEY(idCategoria) REFERENCES categoria(id),
                FOREIGN KEY(idDono) REFERENCES usuario(id)
            )    
        `)

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS escambo(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                idDestinatario INTEGER,
                itemDesejado INTEGER NOT NULL, 
                itemProponente INTEGER NOT NULL,
                status TEXT NOT NULL,
                FOREIGN KEY(idDestinatario) REFERENCES usuario(id),
                FOREIGN KEY(itemDesejado) REFERENCES item(id),
                FOREIGN KEY(itemProponente) REFERENCES item(id)
            )    
        `)
    }

    pesquisarEmail(email){
        return this.db.prepare(`SELECT * FROM usuario WHERE email = ?`).get(email)
    }

    inserirUsuario(nome,email,senha){
        return this.db.prepare(`
            INSERT INTO usuario(nome,email,senha) VALUES(?,?,?)
        `).run(nome,email,senha)
    }
}
class Sistema {
    constructor() {
        this.usuarioLogado = null;
        this.db = new Banco;
        this.db.criarTabelas()
    }

    pausar() {
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

	cadastrarUsuario(nome, email, senha){
        if(this.db.pesquisarEmail(email) != undefined){
            console.log("⚠️ Já existe um usuário cadastrado com esse e-mail.")
        }else{
            this.db.inserirUsuario(nome,email,senha)
            console.log("✅ Usuário cadastrado com sucesso!")
        }
	}

	login(email,senha){
        const usuario = this.db.pesquisarEmail(email) 

        if(usuario === undefined){
            console.log("⚠️ E-mail não cadastrado.")
        }else if(usuario.senha != senha){
            console.log("⚠️ Senha incorreta.")
        }else{
            this.usuarioLogado = usuario
            console.log(`"✅ Bem-vindo(a), ${usuario.nome}!"`)
        }
	}

	logout(){
        this.usuarioLogado = null
        console.log("Você saiu da conta.")
	}
}

const sistema = new Sistema();

// Cadastrando 5 usuários
sistema.cadastrarUsuario("Ana Silva", "ana@email", "123");
sistema.cadastrarUsuario("Bruno Souza", "bruno.souza@email.com", "senha456");
sistema.cadastrarUsuario("Carla Dias", "carla.dias@email.com", "senha789");
sistema.cadastrarUsuario("Daniel Lima", "daniel.lima@email.com", "abc123");
sistema.cadastrarUsuario("Elena Costa", "elena.costa@email.com", "xyz789");

let opcao = -1;

console.clear();
console.log("\n===========================================");
console.log("      BEM-VINDO AO SISTEMA DE ESCAMBO      ");
console.log("===========================================");

while (opcao !== 0) {

    if (sistema.usuarioLogado === null) {

        console.log("\n---- MENU ----");
        console.log("1 - Criar conta");
        console.log("2 - Entrar");
        console.log("0 - Sair");
        console.log("-------------------------\n");

        opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                const nomeCadastro = prompt("Nome: ");
                const emailCadastro = prompt("E-mail: ");
                const senhaCadastro = prompt("Senha: ");
                sistema.cadastrarUsuario(nomeCadastro, emailCadastro, senhaCadastro);
                sistema.pausar();
                break;
            case 2:
                const emailLogin = prompt("E-mail: ");
                const senhaLogin = prompt("Senha: ");
                sistema.login(emailLogin, senhaLogin);
                sistema.pausar();
                break;
            case 0:
                console.log("\nFinalizando o sistema... Até logo!\n");
                break;
            default:
                console.log("\n⚠️ Opção inválida! Tente novamente.");
                sistema.pausar();
                break;
        }

    } else {

        console.log("\n---- MENU (" + sistema.usuarioLogado.nome + ") ----");
        console.log("1 - Sair da conta");
        console.log("0 - Encerrar o sistema");
        console.log("-------------------------\n");

        opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                sistema.logout();
                sistema.pausar();
                break;
            case 0:
                console.log("\nFinalizando o sistema... Até logo!\n");
                break;
            default:
                console.log("\n⚠️ Opção inválida! Tente novamente.");
                sistema.pausar();
                break;
        }
    }
}