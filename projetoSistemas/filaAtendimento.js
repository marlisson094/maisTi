class FilaDeAtendimento{
    constructor(){
        this.pacientes = [];
        this.proximaSenha = 1;
    }

    entrarNaFila(nome){
        this.pacientes.push({'nome':nome, 'senha':this.proximaSenha})
        this.proximaSenha++
        return this.pacientes.length
    }

    chamarProximo(){

        if(this.pacientes.length > 0){

            let pacienteChamado = this.pacientes[0]
            
            for(let i=0; i<this.pacientes.length-1; i++){
                this.pacientes[i] = this.pacientes[i+1]
                
            }
            this.pacientes.splice(this.pacientes.length-1,1)
            
            console.log(`\nSenha: ` + pacienteChamado.senha)
            console.log(`Paciente: ` + pacienteChamado.nome)
        }else{
            console.log("\nNão há pacientes na fila!")
        }

    }
}

//Casos de teste
let fila = new FilaDeAtendimento()

fila.entrarNaFila("Ana Souza")
fila.entrarNaFila("Carlos Lima")
fila.entrarNaFila("Beatriz Rocha")
fila.chamarProximo()
fila.chamarProximo()

fila.entrarNaFila("Diego Alves")

fila.chamarProximo()
fila.chamarProximo()
fila.chamarProximo()