const eleImg = document.getElementById('eleImg')
const btn = document.getElementById('btnGerar')

async function gerarImg(){
    try{
        const resp = await fetch('https://dog.ceo/api/breeds/image/random')
        const dados = await resp.json()
        eleImg.src = dados.message
        eleImg.classList.remove('escondido')
    }catch(erro){
        console.error('Erro ao fazer requisição: ', erro)
    }
}


btn.addEventListener('click', gerarImg)