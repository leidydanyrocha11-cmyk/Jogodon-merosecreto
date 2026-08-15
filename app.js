let listaDeNumeroSorteado = [];
let valorMaximo = 20;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 20');
}

mensagemInicial();


function verificarChute(){
    let chute = document.querySelector('input').value;

    let tentativa = numeroTentativas > 1? 'tentativas' : 'tentativa';
    let mensagem = `Você escolheu o número certo com ${numeroTentativas} ${tentativa}!`;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if(chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número é menor!');
    }else {
        exibirTextoNaTela('p', 'O número é maior!');
    }
    
    numeroTentativas++;
    limparCampo();
}

function gerarNumeroAleatorio(){
    let numeroSorteado = parseInt(Math.random()*valorMaximo + 1);
    let quantidadeDeNumerosSorteados = listaDeNumeroSorteado.length;

    if(quantidadeDeNumerosSorteados == valorMaximo){
        listaDeNumeroSorteado = [];
    }

    if(listaDeNumeroSorteado.includes(numeroSorteado)){
       return gerarNumeroAleatorio();
    }else{
        listaDeNumeroSorteado.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
