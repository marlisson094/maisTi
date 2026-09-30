/*Ao final deste exercício, você deve saber:

    Quais são as classes do sistema;
    O que cada classe guarda;
    Por que o sistema precisa dessas classes.
*/

//Classe //Finalidade 
    //o que precisa guardar

class Usuario{ //Criar conta e entrar no sistema
    constructor(nome, email, senha){ //Os dados de cada pessoa
        this.id = crypto.randomUUID()
        this.nome = nome 
        this.email = email
        this.senha = senha
        this.categoriasinteresse = []
    }

    adicionarInteresse(idItem){
        this.categoriasinteresse.push(idItem)
    }
}

class Categoria{//Escolher interesses e buscar itens por categoria
    constructor(id, nome){ //As categorias em que os objetos se organizam
        this.id = id
        this.nome = nome
    }
}

class Item{ //Cadastrar, editar e excluir itens; buscar os itens de outras pessoas
    constructor(nome, descricao, catgItem, usuarioItem, situacao = "disponivel"){ //Os objetos que as pessoas querem trocar
        this.id = crypto.randomUUID()
        this.nome = nome
        this.descricao = descricao
        this.catgItem = catgItem
        this.usuarioItem = usuarioItem
        this.situacao = situacao
    }

	setSituacao(){
		this.situacao = "trocado"
	}
}

class Escambo{ //Sugerir, aceitar ou negar uma troca; consultar o histórico
    constructor(itemDesejado, itemOfertado, idUsuarioOferece, idUsuarioRecebe, situacao = "pendente"){ //Cada proposta de troca e como ela terminou
        this.id = crypto.randomUUID()
        this.itemDesejado = itemDesejado
        this.itemOfertado = itemOfertado
        this.idUsuarioOferece = idUsuarioOferece
        this.idUsuarioRecebe = idUsuarioRecebe
        this.situacao = situacao
    }

	resultadoOferta(aceitado){
		if(aceitado){
			this.situacao = "aceito"
			this.itemOfertado.setSituacao()
			this.itemDesejado.setSituacao()
		}else{
			this.situacao = "recusado"
		}
	}
}

// --- CRIAÇÃO DAS CATEGORIAS ---
let eletronico = new Categoria(1, "Eletrônico")
let RoupasAcessorios = new Categoria(2, "Roupas e Acessórios")
let LivrosRevistas = new Categoria(3, "Livros e Revistas")
let EsporteLazer = new Categoria(4, "Esportes e Lazer")

// --- CRIAÇÃO DOS USUÁRIOS ---
let ana = new Usuario("Ana Souza", "ana@email.com", "1234");
ana.adicionarInteresse(3)

let carlos = new Usuario("Carlos Lima", "carlos@email.com", "abcd");


// --- CRIAÇÃO DOS ITENS ---
let bicicleta = new Item("Bicicleta aro 26","Bicicleta com 18 marchas, em bom estado.",4,ana.id)

let domCasmurro = new Item("Dom Casmurro","Edição de bolso, sem rasuras.",3,carlos.id)

// --- CRIAÇÃO DO ESCAMBO ---
let propostasEscambo1 = new Escambo(
    domCasmurro,        
    bicicleta,         
	ana.id,                 
    carlos.id,              
);

// --- EXIBIÇÃO NO CONSOLE (TODOS AO FINAL) ---
console.log("--- CATEGORIAS ---");
console.log(eletronico);
console.log(RoupasAcessorios);
console.log(LivrosRevistas);
console.log(EsporteLazer);

console.log("\n--- USUÁRIOS ---");
console.log(ana);
console.log(carlos);

console.log("\n--- ITENS ---");
console.log(bicicleta);
console.log(domCasmurro);

console.log("\n--- ESCAMBO ---");
console.log(propostasEscambo1);

//Simular proposta aceita 
propostasEscambo1.resultadoOferta(true)

console.log(propostasEscambo1)
console.log(domCasmurro)
console.log(bicicleta)