// Seleciona o título
const titulo = document.getElementById('tituloPrincipal');

//-----------------------------------------------------------------------------------------------
//btn 1
const meuBotao1 = document.getElementById('botao1');
// 1. DECLARAÇÃO DE FUNÇÃO
function mudarTexto() {
  // Modifica o conteúdo de texto do H1
  titulo.textContent = 'Texto alterado com sucesso!';
}
// Associa a função ao evento de clique do botão
meuBotao1.addEventListener('click', mudarTexto);

//-----------------------------------------------------------------------------------------------
// Seleciona o segundo botão
const meuBotao2 = document.getElementById('botao2');
// 2. EXPRESSÃO DE FUNÇÃO
const mudarCor = function() {
  // Modifica o estilo CSS do H1
  titulo.style.color = 'blue';
};
// Associa a função ao evento de clique
meuBotao2.addEventListener('click', mudarCor);

//-----------------------------------------------------------------------------------------------
// Seleciona o terceiro botão
const meuBotao3 = document.getElementById('botao3');
// 3. ARROW FUNCTION
const esconderTitulo = () => {
  //ex1
  if(titulo.style.display === 'none'){titulo.style.display = 'block';}
  else{titulo.style.display = 'none';}
  // Modifica o estilo para esconder o elemento
};
// Associa a função ao evento de clique
meuBotao3.addEventListener('click', esconderTitulo);

//-----------------------------------------------------------------------------------------------
//ex2
const meuBotao4 = document.getElementById("botao4")
function alternar(){titulo.classList.toggle('destaque')}
meuBotao4.addEventListener('click', alternar)

//-----------------------------------------------------------------------------------------------
//ex3
const meuBotao5 = document.getElementById('botao5')

function adicionarP(){
  const p = document.createElement('p')
  const container = document.getElementById('container')
  
  p.textContent = "Novo parágrafo!"
  container.append(p)
}
meuBotao5.addEventListener('click', adicionarP)

//-----------------------------------------------------------------------------------------------
//ex4
const meuBotao6 = document.getElementById('botao6')
const inp = document.getElementById('campoTexto')
const para = document.getElementById('exibirTexto')

function exibir(){
  para.textContent = inp.value
}

meuBotao6.addEventListener('click', exibir)

//-----------------------------------------------------------------------------------------------
//ex5
const meuBotao7 = document.getElementById('botao7')
const cont = document.getElementById('cont')

function incrementar(){
  cont.textContent = parseInt(cont.textContent)+1
}

meuBotao7.addEventListener('click', incrementar)




























