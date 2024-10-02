let leituraAtiva = false; // Estado da leitura, inicialmente desativado

// Função para ler o texto ou a descrição da imagem
function lerTexto(elemento) {
    if (!leituraAtiva) return; // Se a leitura estiver desativada, não faz nada

    let texto;

    // Verifica se o elemento é uma imagem e, se for, usa o atributo alt
    if (elemento.tagName.toLowerCase() === 'img') {
        texto = elemento.alt; // Pega o texto do atributo alt
    } else {
        texto = elemento.innerText || elemento.textContent; // Pega o texto do elemento de texto
    }

    // Verificar se o texto não está vazio
    if (texto && texto.trim()) {
        // Inicializar o objeto de síntese de fala
        const synth = window.speechSynthesis;

        // Criar uma nova instância de fala
        const utterance = new SpeechSynthesisUtterance(texto);

        // Definir o idioma (português do Brasil, no caso)
        utterance.lang = 'pt-BR';

        // Reproduzir o áudio
        synth.speak(utterance);
    }
}

// Função para ativar/desativar a leitura
function toggleLeitura() {
    leituraAtiva = !leituraAtiva; // Alterna o estado da leitura
    const botao = document.getElementById("toggle-button");

    // Se a leitura for desativada, cancelar qualquer fala em andamento
    if (!leituraAtiva) {
        window.speechSynthesis.cancel(); // Para a fala imediatamente
        botao.textContent = "Ativar Leitura";
        botao.classList.add("desativado");
    } else {
        botao.textContent = "Desativar Leitura";
        botao.classList.remove("desativado");
    }
}

// Evento global de clique para identificar elementos de texto e imagens
document.addEventListener('click', function(event) {
    const elemento = event.target;

    // Lista de tags de elementos que normalmente contém textos ou imagens
    const elementosTexto = ['P', 'H1', 'H2', 'H3', 'DIV', 'SPAN', 'LI', 'A', 'IMG' ];

    // Verifica se o elemento é uma das tags de texto ou imagem
    if (elementosTexto.includes(elemento.tagName)) {
        lerTexto(elemento); // Ler o texto do elemento ou a descrição da imagem
    }
});
