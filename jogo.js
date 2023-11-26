// Pegando tamanho do navegador
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

// Recupera a dificuldade na URL
var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    // 1500 = 1.5s
    var criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
    // 1000
    var criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris'){
    // 750
    var criaMosquitoTempo = 750
}

// Tamanho da janela
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}
ajustaTamanhoPalcoJogo()

// Cronometro
var cronometro = setInterval(function() {
    tempo -= 1
    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
},1000)

// Criando posição aleatoria
function posicaoRandomica() {
    // remover mosquito anterior(caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
           window.location.href = 'fim_de_jogo.html'
        }else {
            document.getElementById('v' + vidas).src='img/coracao_vazio.png'
            vidas++
        }
    }

    //Consertando posição para mosca não sair da tela.
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // Criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute' 
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

// Criando tamanho aleatorio moscas
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

// Criando posição lados
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}