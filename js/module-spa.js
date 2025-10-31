// =========================================================
// module-spa.js (MÓDULO DE ROTEAMENTO SPA)
// Requisito: Implementar sistema de Single Page Application (SPA) básico.
// =========================================================

const mainContent = document.querySelector('main');

// Mapeia os caminhos de URL para os nomes de arquivo (sem a extensão .html)
const rotas = {
    '/': 'index',
    '/index.html': 'index',
    '/projetos.html': 'projetos',
    '/cadastro.html': 'cadastro',
};

// Função para carregar o conteúdo HTML de um arquivo
async function carregarConteudo(caminho) {
    try {
        const urlBase = caminho === '/' ? rotas['/'] : rotas[caminho];
        
        // Simulação: o conteúdo de cada página deve ser carregado.
        // Se você estiver rodando em um servidor local (como Live Server), 
        // esta função fetch irá buscar o conteúdo de 'html/index.html', etc.
        const response = await fetch(`../html/${urlBase}.html`); 
        
        if (!response.ok) {
            throw new Error(`Não foi possível carregar o conteúdo: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // 1. Cria um contêiner temporário para analisar o HTML carregado
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        
        // 2. Extrai apenas o conteúdo dentro da tag <main>
        const novoMain = tempContainer.querySelector('main');
        
        if (novoMain) {
            // Substitui o conteúdo atual da tag <main> pelo novo conteúdo
            mainContent.innerHTML = novoMain.innerHTML; 
        }

    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        mainContent.innerHTML = `<h1>Erro 404: Página não encontrada!</h1><p>${error.message}</p>`;
    }
}

// Função principal de roteamento e escuta de eventos
function initSPA() {
    // 1. Intercepta o clique em todos os links da navegação
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        
        // Verifica se o elemento clicado é um link interno (tag <a>)
        if (target.tagName === 'A' && target.href.startsWith(window.location.origin)) {
            
            // Impede o comportamento padrão de recarregar a página
            event.preventDefault();
            
            const novoCaminho = target.pathname;
            
            // Adiciona o novo caminho ao histórico do navegador (sem recarregar)
            window.history.pushState(null, '', novoCaminho);
            
            // Carrega o novo conteúdo
            carregarConteudo(novoCaminho);
            
            // Garante que o menu mobile, se estiver ativo, seja fechado após o clique
            const menu = document.getElementById('menu-principal');
            if (menu && menu.classList.contains('ativo')) {
                menu.classList.remove('ativo');
                // Opcional: ajustar o ícone do hambúrguer, se for necessário.
            }
        }
    });

    // 2. Escuta mudanças no histórico (botões Voltar/Avançar do navegador)
    window.addEventListener('popstate', () => {
        carregarConteudo(window.location.pathname);
    });

    // 3. Carrega a página inicial ao iniciar a aplicação
    carregarConteudo(window.location.pathname);
}

// Exporta a função para que main.js possa chamá-la
export { initSPA };