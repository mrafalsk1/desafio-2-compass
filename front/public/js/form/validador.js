const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    if (input.dataset.tipo === 'valor') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
        document.querySelector('#nome').focus()
    }
    // if(input.dataset.tipo === 'nome') {
    //     input.addEventListener('keydown', (event) => {
    //     event.target.value = event.target.value.replace(/[0-9]+/,'')
    //     })
    // }
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})
const validadores = {
    nome: input => validaNome(input),
    tempo: input => validaTempo(input)
}
function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        customError: 'O campo de nome deve conter apenas letras.'
    },
    descricao: {
        valueMissing: 'O campo de descricao não pode estar vazio.'
    },
    valor: {
        valueMissing: 'O campo de preço não pode estar vazio.'
    },
    tempo: {
        valueMissing: 'O campo de tempo não pode estar vazio.',
        customError: 'O campo de tempo deve conter apenas números.'
    },
    imagem: {
        valueMissing: 'O campo de imagem não pode estar vazio.'
    }
}

// const validadores = {
//     dataNascimento:input => validaDataNascimento(input),
//     cpf:input => validaCPF(input),
//     cep:input => recuperarCEP(input)
// }


function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}
function validaTempo(input) {
    let mensagem = ''
    const regex = /^[0-9]*$/
    if (!regex.test(input.value)) {
        mensagem = 'O campo de tempo deve conter somente números.'
    }
    input.setCustomValidity(mensagem)
}
function validaNome(input) {
    let mensagem = ''
    const regex = /^[a-zA-ZÀ-ú\s]*$/
    if (!regex.test(input.value.trim().replace(' ',''))) {
        mensagem = 'O campo de nome deve conter somente letras.'
    }
    input.setCustomValidity(mensagem)
}