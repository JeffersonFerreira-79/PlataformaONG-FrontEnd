// =========================================================
// module-validacao.js (MÓDULO DE VALIDAÇÃO AVANÇADA)
// Requisito: Sistema de verificação de consistência de dados em formulários.
// =========================================================

// --- FUNÇÕES DE VALIDAÇÃO GERAIS ---

// Função de validação de CPF (Algoritmo básico)
function validaCPF(cpfLimpo) {
    if (cpfLimpo.length !== 11) return false;
    
    // Evita CPFs inválidos óbvios como "11111111111"
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

    soma = 0;
    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

    return true;
}

// Função de validação de Email (Regex simples)
function validaEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// --- FUNÇÃO DE FEEDBACK VISUAL E CONTROLE ---

// Mapeamento de erros customizados (Mensagens)
const mensagensDeErro = {
    nome_completo: 'O nome completo deve conter pelo menos 3 caracteres.',
    email: 'Por favor, insira um e-mail válido no formato: nome@dominio.com',
    cpf: 'O CPF é inválido. Verifique os números e o formato (xxx.xxx.xxx-xx).',
    // Adicione outras mensagens para campos como telefone e data, se necessário
};

// Função principal de inicialização da validação
function initValidacaoForm(formId = 'cadastro-form') {
    const form = document.getElementById(formId).querySelector('form');
    if (!form) return;

    // Adiciona o elemento de feedback visual no DOM (caso o elemento não exista)
    const adicionarFeedbackElemento = (input) => {
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('input-feedback')) {
            feedback = document.createElement('div');
            feedback.classList.add('input-feedback');
            input.parentNode.insertBefore(feedback, input.nextSibling);
        }
        return feedback;
    };

    // Função para validar campo específico
    const validarCampo = (input) => {
        const nomeCampo = input.name;
        const valorCampo = input.value.trim();
        const feedbackElemento = adicionarFeedbackElemento(input);
        
        let erro = false;
        let mensagem = '';
        
        // 1. Validação Básica (HTML5 nativo)
        if (input.validity.valueMissing) {
            erro = true;
            mensagem = 'Este campo é obrigatório.';
        } 
        
        // 2. Validação Avançada por campo
        else if (nomeCampo === 'email' && !validaEmail(valorCampo)) {
            erro = true;
            mensagem = mensagensDeErro.email;
        } 
        
        else if (nomeCampo === 'cpf') {
            const cpfLimpo = valorCampo.replace(/\D/g, ''); // Remove máscara
            if (!validaCPF(cpfLimpo)) {
                erro = true;
                mensagem = mensagensDeErro.cpf;
            }
        } 
        
        // 3. Validação de Tamanho Mínimo (Exemplo)
        else if (nomeCampo === 'nome_completo' && valorCampo.length < 3) {
            erro = true;
            mensagem = mensagensDeErro.nome_completo;
        }

        // 4. Aplica Feedback Visual (Classe CSS)
        if (erro) {
            input.classList.add('invalido');
            input.classList.remove('valido');
            feedbackElemento.textContent = mensagem;
            feedbackElemento.style.display = 'block';
        } else {
            input.classList.remove('invalido');
            input.classList.add('valido');
            feedbackElemento.style.display = 'none';
        }

        return !erro;
    };
    
    // Adiciona escuta de eventos (input e blur) para validação em tempo real
    const inputs = form.querySelectorAll('input:not([type="checkbox"]), select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validarCampo(input)); // Valida ao sair do campo
        input.addEventListener('input', () => validarCampo(input)); // Valida ao digitar (para feedback rápido)
    });

    // Intercepta o envio do formulário para validação final
    form.addEventListener('submit', (e) => {
        let formValido = true;
        inputs.forEach(input => {
            // Valida todos os campos e define formValido como false se algum falhar
            if (!validarCampo(input)) {
                formValido = false;
            }
        });

        if (!formValido) {
            e.preventDefault(); // Impede o envio se houver erros
            alert('Por favor, corrija os erros do formulário antes de enviar.');
        }
    });
}

export { initValidacaoForm };