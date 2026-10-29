// Seleciona o primeiro botão e o título
const meuBotao1 = document.getElementById('botao1');
const titulo = document.getElementById('tituloPrincipal');

// 1. DECLARAÇÃO DE FUNÇÃO
function mudarTexto() {
  // Modifica o conteúdo de texto do H1
  titulo.textContent = 'Texto alterado com sucesso!';
}

// Associa a função ao evento de clique do botão
meuBotao1.addEventListener('click', mudarTexto);

// Seleciona o segundo botão
const meuBotao2 = document.getElementById('botao2');

// 2. EXPRESSÃO DE FUNÇÃO
const mudarCor = function() {
  // Modifica o estilo CSS do H1
  titulo.style.color = 'blue';
};

// Associa a função ao evento de clique
meuBotao2.addEventListener('click', mudarCor);

// Seleciona o terceiro botão
const meuBotao3 = document.getElementById('botao3');

// 3. ARROW FUNCTION
const esconderTitulo = () => {
  // Modifica o estilo para esconder o elemento
  if(titulo.style.display === 'none'){
    titulo.style.display = 'block';
  }else{
    titulo.style.display = 'none';
  }
};

// Associa a função ao evento de clique
meuBotao3.addEventListener('click', esconderTitulo);

//Selecionar 4° botão 
const meuBotao4 = document.getElementById('botao4')

//4 - Alternar 
const alternarCss = () => {
  //titulo.classList.toggle('.destaque')
  console.log(titulo.classList.toggle('destaque'))
}

//Associa a função ao evento de clique 
meuBotao4.addEventListener('click', alternarCss)

//btn 5
const meuBotao5 = document.getElementById('botao5')
const adicionarP = () => {
  const p = document.createElement('p')
  const divContainer = document.getElementById('container')
  p.textContent = 'Novo parágrafo'
  divContainer.append(p)
}
meuBotao5.addEventListener('click', adicionarP)

//btn6 
const meuBotao6 = document.getElementById('botao6')
function mostrarTexto( ){
  const inputElement = document.getElementById("campoTexto")
  const para = document.getElementById('exibirTexto')
  para.textContent = inputElement.value

}
meuBotao6.addEventListener('click', mostrarTexto)

//btn7
const meuBotao7 = document.getElementById('botao7')
function incrementar(){
  const contador = document.getElementById('contador')
  contador.textContent = parseInt(contador.textContent)+1
}
meuBotao7.addEventListener('click', incrementar)