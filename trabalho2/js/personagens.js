const API_BASE = 'http://localhost:3000';

// Busca os jogos da API e monta o mapa { abreviacao: titulo }
async function carregarMapaJogos() {
    const res = await fetch(`${API_BASE}/games`);
    const jogos = await res.json();

    const mapa = {};
    jogos.forEach(jogo => {
        mapa[jogo.abreviacao] = jogo.titulo;
    });
    return mapa;
}

function renderAparicoes(aparicoes, mapaJogos) {
    if (!aparicoes || aparicoes.length === 0) return '—';
    return aparicoes
        .map(abrev => {
            const nome = mapaJogos[abrev] || abrev; // se não achar, mostra a abreviação
            return `<a href="/trabalho2/site/jogos.html#${abrev}"><i>${nome}</i></a>`;
        })
        .join('<br>');
}

function renderLinha(character, mapaJogos) {
    return `
        <tr>
            <td>${character.titulo}</td>
            <td>${character.conteudo}</td>
            <td>${renderAparicoes(character.aparicoes, mapaJogos)}</td>
            <td><img src="${character.imagem || ''}" alt="imagem de ${character.titulo}"></td>
        </tr>
    `;
}

function renderErro(tbodyId, tipo) {
    document.getElementById(tbodyId).innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center; padding:24px; color:#c0392b;">
                ⚠️ Não foi possível carregar os ${tipo}s. Verifique se o servidor está rodando em ${API_BASE}.
            </td>
        </tr>
    `;
}

async function carregarCharacters(tipo, tbodyId, mapaJogos) {
    try {
        const res = await fetch(`${API_BASE}/characters?tipo=${tipo}`);
        if (!res.ok) throw new Error(`Erro ${res.status}`);

        const characters = await res.json();

        if (characters.length === 0) {
            document.getElementById(tbodyId).innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; padding:24px;">
                        Nenhum ${tipo} encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        document.getElementById(tbodyId).innerHTML = characters
            .map(c => renderLinha(c, mapaJogos))
            .join('');

    } catch (err) {
        console.error(`Erro ao carregar ${tipo}s:`, err);
        renderErro(tbodyId, tipo);
    }
}

// Ponto de entrada: primeiro carrega os jogos, depois os personagens
async function init() {
    const mapaJogos = await carregarMapaJogos();
    carregarCharacters('personagem', 'tabela-personagens', mapaJogos);
    carregarCharacters('inimigo', 'tabela-inimigos', mapaJogos);
}

init();