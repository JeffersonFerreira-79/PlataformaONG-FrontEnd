// =========================================================
// CÓDIGO COMPLETO (FINALIZANDO O JAVASCRIPT)
// =========================================================

// =========================================================
// PASSO 14: FUNÇÕES DE MÁSCARA PARA FORMULÁRIO (Funções de apoio)
// =========================================================

const mascara = (valor, padrao) => {
    let i = 0;
    const v = valor.replace(/\D/g, ''); 
    return padrao.replace(/./g, (c) => (
        c === '9' && v[i] ? v[i++] : c
    ));
};

const mascaraCPF = (valor) => {
    return mascara(valor, '999.999.999-99');
};

const mascaraTelefone = (valor) => {
    const padrao = valor.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999';
    return mascara(valor, padrao);
};

const mascaraCEP = (valor) => {
    return mascara(valor, '99999-999');
};


// =========================================================
// PASSO 17: INDICADOR DINÂMICO DE PROGRESSO 
// =========================================================

const animarBarraProgresso = (porcentagemAlcancada) => {
    const barraInterna = document.getElementById('barra-interna');
    const valorRestanteSpan = document.getElementById('valor-restante');
    
    // Verifica se os elementos existem na página (apenas em projetos.html)
    if (barraInterna && valorRestanteSpan) {
        
        // Simulação de valores da meta
        const metaTotal = 10000;
        const valorAlcancado = (porcentagemAlcancada / 100) * metaTotal;
        const valorRestante = metaTotal - valorAlcancado;
        
        // 1. Atualiza a largura da barra (gatilho para a animação CSS)
        barraInterna.style.width = `${porcentagemAlcancada}%`;
        
        // 2. Atualiza o texto do valor restante
        valorRestanteSpan.textContent = valorRestante.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).replace('R$', '').trim();

        // 3. Adiciona texto na própria barra (opcional)
        barraInterna.textContent = `${porcentagemAlcancada}%`;
    }
};


// =========================================================
// PASSO 15 & 16: INICIALIZAÇÃO DE EVENTOS
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Aplicação das Máscaras (Passo 15) ---
    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCEP = document.getElementById('cep');

    if (inputCPF) {
        inputCPF.addEventListener('input', (e) => {
            e.target.value = mascaraCPF(e.target.value);
        });
    }

    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            e.target.value = mascaraTelefone(e.target.value);
        });
    }

    if (inputCEP) {
        inputCEP.addEventListener('input', (e) => {
            e.target.value = mascaraCEP(e.target.value);
        });
    }

    // --- 2. Funcionalidade de Menu Toggle (Passo 16) ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuPrincipal = document.getElementById('menu-principal');

    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener('click', () => {
            menuPrincipal.classList.toggle('ativo');
            
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.textContent = isExpanded ? '☰' : '✕';
        });
    }

    // --- 3. Inicialização da Animação de Progresso (Passo 17) ---
    // Simula que 70% foi alcançado e inicia a animação
    animarBarraProgresso(70); 

});