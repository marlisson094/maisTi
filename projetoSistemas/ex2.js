/*Vamos melhorar o sistema de notas que vimos anteriormente. Além de armazenar alunos e calcular médias por disciplina, queremos criar uma classe chamada Turma, responsável por reunir vários alunos e gerar uma lista com o desempenho deles em uma determinada disciplina.

A classe Turma deve possuir:

    um atributo nomeTurma, que guarda o nome da turma;
    um array chamado alunos, que armazenará objetos da classe Aluno;
    um método criaRanking(disciplina), que recebe o nome de uma disciplina ("matematica" ou "portugues") e retorna uma lista contendo o nome dos alunos e suas respectivas médias nessa disciplina.

A ideia é que o método percorra todos os alunos cadastrados na turma, calcule a média de cada um na disciplina informada e organize os resultados de modo que os alunos com as melhores médias apareçam primeiro.

 */

class Aluno{
    constructor(nome){
        this.nome = nome;
        this.matematica = [];
        this.portugues = [];
    }

    adicionaNota(nota, disciplina){
        if (disciplina == "matematica"){
            this.matematica.push(nota)
        }
        else if (disciplina == "portugues"){
            this.portugues.push(nota)
        }
    }

    media(array){
        let soma = 0;
        for (let nota of array){
            soma += nota;
        }
        return soma / array.length
    }

    calculaMedia(disciplina){
        if (disciplina == "matematica"){
            return this.media(this.matematica)
        }
        else if(disciplina == "portugues"){
            return this.media(this.portugues)
        }
        else{
            console.log("Disciplina não reconhecida.")
        }
    }
}

class Turma{
    constructor(nomeTurma){
        this.nomeTurma = nomeTurma;
        this.alunos = [];
    }

    criaRanking(disciplina){
        let ranking = []
        let houveTroca = true
        
        for( let aluno of this.alunos){
         ranking.push({'nome':aluno.nome, 'media':aluno.calculaMedia(disciplina)})   
        }

        while(houveTroca){
            houveTroca = false 

            for(let i=0; i<this.alunos.length-1; i++){
                
                let alunoAtual = ranking[i]
                let proxAluno = ranking[i+1]
                
                if(alunoAtual.media < proxAluno.media){
                    houveTroca = true
                    ranking[i] = proxAluno
                    ranking[i+1] = alunoAtual
                }
            }
        }

        return ranking
    }
}


// Casos de teste

let a1 = new Aluno("Beltrano");
a1.adicionaNota(9, "matematica");
a1.adicionaNota(9, "matematica");

let a2 = new Aluno("Fulano");
a2.adicionaNota(10, "matematica");
a2.adicionaNota(7, "matematica");

let a3 = new Aluno("Ciclana");
a3.adicionaNota(10, "matematica");
a3.adicionaNota(9, "matematica");

let turma = new Turma("3º Ano");

turma.alunos.push(a1);
turma.alunos.push(a2);
turma.alunos.push(a3);

console.log(turma.criaRanking("matematica"));