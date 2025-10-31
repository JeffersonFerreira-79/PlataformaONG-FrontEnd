// =========================================================
// main.js (ARQUIVO PRINCIPAL DE INICIALIZAÇÃO)
// ENTREGA IV - ETAPA 1: MODO ESCURO
// =========================================================

// Importa módulos
import { mascaraCPF, mascaraTelefone, mascaraCEP } from './module-mascaras.js';
import { initSPA } from './module-spa.js'; 
import { initValidacaoForm } from './module-validacao.js'; 


// --- Funções de Componentes (incluindo o novo Modo Escuro) ---

const animarBarraProgresso = (porcentagemAlcancada) => {
    // ... (Código da barra de progresso - Sem alterações) ...
};

const initMenuToggle = () => {
    // ... (Código do Menu Toggle - Sem alterações) ...
};

// NOVO: Função para Carregar Tema do LocalStorage 
const carregarTema = () => {
    const temaSalvo = localStorage.getItem('theme');
    const body = document.body;
    
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Atualiza o ícone do botão após carregar o tema
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
};

// NOVO: Função para Alternar Tema
const initThemeToggle = () => {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const body = document.body;
            body.classList.toggle('dark-mode');

            // Salva a preferência do usuário 
            const novoTema = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', novoTema);

            // Atualiza o ícone
            toggleButton.textContent = novoTema === 'dark' ? '☀️' : '🌙';
        });
    }
};
// --- Fim das Funções de Componentes ---


document.addEventListener('DOMContentLoaded', () => {
    // 0. CARREGA O TEMA SALVO (Deve ser o primeiro a rodar)
    carregarTema();
    
    // 1. Inicializa a SPA
    initSPA(); 

    // 2. Inicializa o Menu Toggle
    initMenuToggle(); 

    // 3. Inicializa o Botão de Tema (Dark Mode)
    initThemeToggle();

    // 4. Inicializa as Máscaras e Validações
    // ... (Código de inicialização das máscaras) ...
    initValidacaoForm('cadastro-form'); 

    // 5. Inicializa a Animação de Progresso
    animarBarraProgresso(70); 
});