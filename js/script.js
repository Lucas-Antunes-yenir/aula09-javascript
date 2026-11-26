// Aula 09 — Variáveis em JavaScript

// Micro-passos
function microPassos() {
    const nome = "Ana";
    let idade = 16;
    const cidade = "Sapucaia do Sul";
    console.log(`${nome} tem ${idade} anos e mora em ${cidade}.`);
    idade = 17;
    console.log(`${nome} tem ${idade} anos e mora em ${cidade}.`);
    try {
        cidade = "Porto Alegre";
    } catch (erro) {
        console.log(`${erro.name}: cidade foi declarada com const e continua valendo "${cidade}".`);
    }
}

// Nível 2 — Adivinhe o resultado

// 4. Texto e soma
function compararTextoENumero() {
    let a = "10";
    let b = 5;
    console.log(a + b); // "105"
    console.log(Number(a) + b); // 15
    console.log(typeof a); // "string"
}

// 5. Correção dos dois erros
function corrigirVariaveis() {
    let nota = 7; // A nota muda, por isso usamos let.
    nota = 8;
    const nome = "Ana"; // A grafia deve coincidir com a usada no console.
    console.log(nome);
}

// 6. Valor e tipo
function verificarTipo() {
    let resposta;
    console.log(resposta); // undefined
    console.log(typeof resposta); // "undefined"
    resposta = "sim";
    console.log(typeof resposta); // "string"
}

// Nível 3 — Mão no código

// 7. Cartão de apresentação
function apresentarEstudante() {
    const nome = "Ana";
    const idade = 16;
    const cidade = "Sapucaia do Sul";
    const curso = "Desenvolvimento de Sistemas";
    console.log(`Eu sou ${nome}, tenho ${idade} anos, moro em ${cidade} e estudo ${curso}.`);
}

// 8. Troca de potes
function trocarValores() {
    let a = 1;
    let b = 2;
    const temporario = a;
    a = b;
    b = temporario;
    console.log(a, b); // 2 e 1
}

// 9. Conversor de temperatura
async function converterTemperatura(perguntar = prompt) {
    const celsius = await lerNumero("Temperatura em °C?", perguntar);
    if (celsius === null) return;
    console.log(`${celsius * 1.8 + 32} °F`);
}

// 10. Média do trimestre
async function calcularMedia(perguntar = prompt) {
    const nota1 = await lerNumero("Primeira nota?", perguntar);
    if (nota1 === null) return;
    const nota2 = await lerNumero("Segunda nota?", perguntar);
    if (nota2 === null) return;
    const nota3 = await lerNumero("Terceira nota?", perguntar);
    if (nota3 === null) return;
    const media = (nota1 + nota2 + nota3) / 3;
    console.log(`Média: ${media}`);
}

// 11. Rachando a pizza
async function dividirConta(perguntar = prompt) {
    const total = await lerNumero("Valor total da pizza?", perguntar);
    if (total === null) return;
    const pessoas = await lerNumero("Quantas pessoas vão dividir a conta?", perguntar);
    if (pessoas === null) return;
    if (total < 0 || !Number.isInteger(pessoas) || pessoas < 1) {
        console.log("Confira o total e a quantidade de pessoas.");
        return;
    }
    const parte = total / pessoas;
    console.log(`Cada pessoa paga R$ ${parte.toFixed(2).replace(".", ",")}.`);
}

// Desafio

// 12. Relógio de minutos
async function converterMinutos(perguntar = prompt) {
    const total = await lerNumero("Quantidade de minutos?", perguntar);
    if (total === null) return;
    if (!Number.isInteger(total) || total < 0) {
        console.log("Digite um número inteiro de minutos igual ou maior que zero.");
        return;
    }
    const horas = Math.floor(total / 60);
    const minutos = total % 60;
    console.log(`${horas}h ${minutos}min`);
}

// Leitura de números para os exercícios 9 a 12
async function lerNumero(pergunta, perguntar) {
    const texto = await perguntar(pergunta);
    if (texto === null) return null;
    const numero = Number(texto.trim().replace(",", "."));
    if (texto.trim() === "" || !Number.isFinite(numero)) {
        console.log("Digite um número válido.");
        return null;
    }
    return numero;
}

if (typeof window !== "undefined") {
    console.log("Aula 09 — Exercício 4: Texto e soma");
    compararTextoENumero();
    console.log("Clique nos botões da página para executar os exercícios.");
}

// Quando o arquivo é executado diretamente pelo Node, abre o menu no terminal.
if (typeof require !== "undefined" && require.main === module) {
    iniciarTerminal().catch(console.error);
}

async function iniciarTerminal() {
    const { createInterface } = require("node:readline");
    const terminal = createInterface({ input: process.stdin, output: process.stdout });
    const linhas = terminal[Symbol.asyncIterator]();

    async function perguntar(texto) {
        process.stdout.write(texto + " ");
        const linha = await linhas.next();
        return linha.done ? null : linha.value.trim();
    }

    const atividades = [
        ["Texto e soma", compararTextoENumero],
        ["Correção dos dois erros", corrigirVariaveis],
        ["Valor e tipo", verificarTipo],
        ["Cartão de apresentação", apresentarEstudante],
        ["Troca de potes", trocarValores],
        ["Conversor de temperatura", converterTemperatura],
        ["Média do trimestre", calcularMedia],
        ["Rachando a pizza", dividirConta],
        ["Relógio de minutos", converterMinutos]
    ];

    try {
        console.log("Aula 09 — Exercícios de JavaScript");
        atividades.forEach(([titulo], indice) => console.log(indice + 4, "-", titulo));
        while (true) {
            const opcao = await perguntar("Escolha um exercício de 4 a 12 (0 para sair):");
            if (opcao === null || opcao === "0") break;
            const atividade = atividades[Number(opcao) - 4];
            if (atividade) {
                await atividade[1](perguntar);
            } else {
                console.log("Opção inválida.");
            }
        }
    } finally {
        terminal.close();
    }
}

