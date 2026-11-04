const btnPrev = document.getElementById('previsao')
const inp = document.getElementById('cep')
const para = document.getElementById('para')

async function buscarCEP(){
    try{
        const resp = await fetch(`http://viacep.com.br/ws/${inp.value}/json/`)
        const dados = await resp.json()
        console.log(JSON.stringify(dados))
        para.textContent = `
            CEP:${dados.cep}, 
            UF: ${dados.uf}, 
            Estado":${dados.estado}, 
            Localidade: ${dados.localidade},  
            Logradouro: ${dados.logradouro}, 
            Bairro":${dados.bairro}
        `
        
    }catch(erro){
        console.error("Falha na requisição: ", erro)
    }
}

btnPrev.addEventListener('click', buscarCEP)
