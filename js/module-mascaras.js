// =========================================================
// module-mascaras.js (MÓDULO DE FUNÇÕES DE MÁSCARA)
// =========================================================

// Função genérica para aplicar máscaras
const mascara = (valor, padrao) => {
    let i = 0;
    const v = valor.replace(/\D/g, ''); // Remove tudo que não for dígito
    return padrao.replace(/./g, (c) => (
        c === '9' && v[i] ? v[i++] : c
    ));
};

// 1. MÁSCARA DE CPF: 999.999.999-99
const mascaraCPF = (valor) => {
    return mascara(valor, '999.999.999-99');
};

// 2. MÁSCARA DE TELEFONE: (99) 99999-9999 ou (99) 9999-9999
const mascaraTelefone = (valor) => {
    const padrao = valor.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999';
    return mascara(valor, padrao);
};

// 3. MÁSCARA DE CEP: 99999-999
const mascaraCEP = (valor) => {
    return mascara(valor, '99999-999');
};

// EXPORTAÇÃO: Tornar as funções disponíveis para outros módulos (como main.js)
export { mascaraCPF, mascaraTelefone, mascaraCEP };