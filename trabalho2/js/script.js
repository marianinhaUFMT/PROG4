const btnDark = document.getElementById('toggle-dark');
const icone = document.getElementById('icone-tema');
const btnCursor = document.getElementById('toggle-cursor');
const cursor_sword = "url('https://github.com/marianinhaUFMT/PROG4/blob/main/trabalho1/assets/master_sword.png?raw=true'), auto";
const sound = document.getElementById('som-zelda');

// Aplicar tema salvo ao carregar a página
if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark-mode');
    icone.classList.replace('fi-rr-moon', 'fi-sr-moon');
}

// Aplicar cursor salvo ao carregar a página
if (localStorage.getItem('cursor') === 'sword') {
    document.body.style.cursor = cursor_sword;
}

// Alternar modo escuro/claro
btnDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        icone.classList.replace('fi-rr-moon', 'fi-sr-moon');
        localStorage.setItem('tema', 'dark');
    } else {
        icone.classList.replace('fi-sr-moon', 'fi-rr-moon');
        localStorage.setItem('tema', 'light');
    }
});

// clicando no botao da espada, o cursor muda para a espada, clicando novamente, volta para o cursor normal
btnCursor.addEventListener('click', () => {
    if (localStorage.getItem('cursor') === 'sword') {
        document.body.style.cursor = "auto";
        localStorage.setItem('cursor', 'default');
    } else {
        sound.play();
        alert("It's dangerous to go alone! Take this.");
        document.body.style.cursor = cursor_sword;
        localStorage.setItem('cursor', 'sword');
    }
});
