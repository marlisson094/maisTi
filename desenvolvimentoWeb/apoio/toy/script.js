// utilitário para gerar cor aleatória em formato hex
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// 1) altera background do elemento com id="principal"
document.getElementById('btn-principal').addEventListener('click', () => {
    const el = document.getElementById('principal');
    if (el) {
        el.style.background = randomColor();
    }
});

// 2) alterna fundo verm/pret nas células com classe "alternavel"
document.getElementById('btn-alternar').addEventListener('click', () => {
    const items = document.querySelectorAll('.alternavel');
    items.forEach(el => {
        const current = window.getComputedStyle(el).backgroundColor;
        if (current === 'rgb(255, 0, 0)') {
            el.style.background = 'black';
        } else {
            el.style.background = 'red';
        }
    });
});

// 3) substitui imagens dentro de hierarquia específica (aqui .hierarquia img)
document.getElementById('btn-cage').addEventListener('click', () => {
    const cageUrl = 'cage.png';
    const imgs = document.querySelectorAll('.hierarquia img');
    imgs.forEach(img => {
        img.src = cageUrl;
    });
});