const prompt = require('prompt-sync')();
const fs = require('fs')

class Usuario {
    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.interesses = [];
    }
}

class Categoria {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class Item {
    constructor(id, nome, descricao, idCategoria, idDono) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
        this.idDono = idDono;
        this.status = "disponivel";
    }
}

class Escambo {
    constructor(id, idItemDesejado, idItemOferecido, idProponente, idDestinatario) {
        this.id = id;
        this.idItemDesejado = idItemDesejado;
        this.idItemOferecido = idItemOferecido;
        this.idProponente = idProponente;
        this.idDestinatario = idDestinatario;
        this.status = "pendente";
    }
}

class Sistema {
    constructor() {
        this.usuarios = [];
        this.categorias = [];
        this.proximoIdUsuario = 1;
        this.usuarioLogado = null;

        this.categorias.push(new Categoria(1, "Eletrônicos"));
        this.categorias.push(new Categoria(2, "Roupas e Acessórios"));
        this.categorias.push(new Categoria(3, "Livros e Revistas"));
        this.categorias.push(new Categoria(4, "Esportes e Lazer"));
    }

    pausar() {
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

    //deve ser chamado toda vez que os dados forem modificados. Por enquanto, isso acontece em um único lugar: quando um novo usuário é cadastrado;
    salvar(){
        const teste = JSON.stringify({"usuarios":this.usuarios,"proximoIdUsuario":this.proximoIdUsuario}, null, 2)
        fs.writeFileSync('escambo.json', teste)
    }

    //chamado uma única vez, logo no início do programa, para preencher o array usuarios (e o contador de ids) com os dados do arquivo;
    carregar(){
        const dadosJson = JSON.parse(fs.readFileSync('escambo.json','utf-8'))
        this.usuarios = dadosJson.usuarios
        this.proximoIdUsuario = dadosJson.proximoIdUsuario
    }

    posicaoDoEmail(email){
        if(this.usuarios.length === 0){
            return -1 
        }
        for(let i=0; i<this.usuarios.length; i++){
            if(this.usuarios[i].email === email){
                return i
            }
        }
        return -1
    }

	cadastrarUsuario(nome, email, senha){
        if(this.posicaoDoEmail(email) != -1){
            console.log("⚠️ Já existe um usuário cadastrado com esse e-mail.")
        }else{
            this.usuarios.push({
                id: this.proximoIdUsuario,
                nome : nome,
                email : email,
                senha : senha,
		    })

            this.proximoIdUsuario++
            this.salvar()
            console.log("✅ Usuário cadastrado com sucesso!")
        }
		
	}

	login(email,senha){
        let posiUser = this.posicaoDoEmail(email) 
        if( posiUser == -1){
            console.log("⚠️ E-mail não cadastrado.")
        }else if(this.usuarios[posiUser].senha != senha){
            console.log("⚠️ Senha incorreta.")
        }else{
            console.log(`"✅ Bem-vindo(a), ${this.usuarios[posiUser].nome}!"`)
            this.usuarioLogado = this.usuarios[posiUser]
        }
	}

	logout(){
        this.usuarioLogado = null
        console.log("Você saiu da conta.")
	}
}

const sistema = new Sistema();

//carregar as informações do arquivo json 
sistema.carregar()

// Cadastrando 5 usuários
sistema.cadastrarUsuario("Ana Silva", "ana.silva@email.com", "senha123");
sistema.cadastrarUsuario("Bruno Souza", "bruno.souza@email.com", "senha456");
sistema.cadastrarUsuario("Carla Dias", "carla.dias@email.com", "senha789");
sistema.cadastrarUsuario("Daniel Lima", "daniel.lima@email.com", "abc123");
sistema.cadastrarUsuario("Elena Costa", "elena.costa@email.com", "xyz789");

let opcao = -1;

//console.clear();
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