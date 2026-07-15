const API_BASE = 'http://localhost:3000';

function renderBadges(jogo) {
    let badges = `<span class="badge-ano">${jogo.ano}</span>`;

    if (jogo.plataformas && jogo.plataformas.length > 0) {
        jogo.plataformas.forEach(p => {
            badges += `<span class="badge-plataforma">${p}</span>`;
        });
    }

    if (jogo.badge) {
        badges += `<span class="badge-especial">${jogo.badge}</span>`;
    }

    return badges;
}

function renderJogo(jogo, index) {
    const cardClass = index % 2 !== 0 ? 'jogo-card-invertido' : 'jogo-card';

    return `
        <section id="${jogo.abreviacao}" class="jogo-secao">
            <div class="${cardClass}">
                <img
                    class="img-capa-vertical"
                    src="${jogo.imagem || ''}"
                    alt="Capa de ${jogo.titulo}"
                >
                <div class="jogo-info">
                    <div class="jogo-badge">
                        ${renderBadges(jogo)}
                    </div>
                    <h2>${jogo.titulo}</h2>
                    <p>${jogo.conteudo}</p>
                </div>
            </div>
        </section>
    `;
}

function renderIndice(jogos) {
    document.getElementById('jogos-indice').innerHTML = jogos
        .map(j => `<a href="#${j.abreviacao}">${j.abreviacao}</a>`)
        .join('');
}

async function carregarJogos() {
    try {
        const res = await fetch(`${API_BASE}/games`);
        if (!res.ok) throw new Error(`Erro ${res.status}`);

        const jogos = await res.json();

        if (jogos.length === 0) {
            document.getElementById('jogos-indice').innerHTML = '';
            document.getElementById('jogos-container').innerHTML = `
                <p style="text-align:center; padding:40px;">Nenhum jogo cadastrado ainda.</p>
            `;
            return;
        }

        renderIndice(jogos);
        document.getElementById('jogos-container').innerHTML = jogos
            .map((jogo, index) => renderJogo(jogo, index))
            .join('');

    } catch (err) {
        console.error('Erro ao carregar jogos:', err);
        document.getElementById('jogos-indice').innerHTML = '';
        document.getElementById('jogos-container').innerHTML = `
            <div style="text-align:center; padding:60px; color:#c0392b;">
                ⚠️ Não foi possível carregar os jogos.<br>
                Verifique se o servidor está rodando em <strong>${API_BASE}</strong>.
            </div>
        `;
    }
}

carregarJogos();