let score = 0;
let gameActive = false;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');

// --- rastro mouse
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'trail';

    const spread = 20;
    const offsetX = (Math.random() - 0.5) * spread;
    const offsetY = (Math.random() - 0.5) * spread;

    trail.style.left = (e.pageX + offsetX) + 'px';
    trail.style.top = (e.pageY + offsetY) + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 800);
});

// --- Função Principal para Iniciar o Jogo ---
function startGame() {
    if (gameActive) return; // Evita iniciar múltiplos loops
    
    score = 0;
    gameActive = true;
    scoreDisplay.innerText = score;
    gameArea.innerHTML = ''; // Limpa inimigos antigos

    // setInterval: Gerar inimigos continuamente (Requisito)
    const gameInterval = setInterval(() => {
        if (gameActive) createEnemy();
    }, 800); // Aparece um novo a cada 800ms

    // setTimeout: Limitar duração do jogo (Requisito)
    setTimeout(() => {
        gameActive = false;
        clearInterval(gameInterval);
        alert(`Fim de jogo! Sua pontuação final: ${score}`);
    }, 15000); // Jogo dura 15 segundos
}

// --- Criar Inimigos Dinamicamente ---
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';

    // Pega a largura e altura exatas do game-area no momento da criação
    const maxX = gameArea.offsetWidth - 100;
    const maxY = gameArea.offsetHeight - 100;
    
    // Evita valores negativos caso a tela seja muito pequena
    const randomX = Math.abs(Math.floor(Math.random() * maxX));
    const randomY = Math.abs(Math.floor(Math.random() * maxY));

    enemy.style.left = `${randomX}px`;
    enemy.style.top = `${randomY}px`;

    // Evento de Clique (Requisito)
    enemy.onclick = function() {
        if (gameActive) {
            score++;
            scoreDisplay.innerText = score;
            this.classList.add('hit'); // Feedback visual
            
            // Remove após um pequeno delay para mostrar o efeito de hit
            setTimeout(() => this.remove(), 100);
        }
    };

    gameArea.appendChild(enemy);

    // Inimigo desaparece sozinho após 1.2 segundos se não for clicado
    setTimeout(() => {
        if (enemy.parentElement) {
            enemy.remove();
        }
    }, 1200);
}